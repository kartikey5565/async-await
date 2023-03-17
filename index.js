console.log('person1: shows ticket');
console.log('person2: shows ticket');


const preMovie = async () => {
    const promiseWifeBringingTicket = new Promise((resolve, reject)=>{
        setTimeout(()=>resolve('ticket',3000));
    });

    const getPopcorn=new Promise((resolve,reject)=>resolve(`popcorn`));

    const getButter=new Promise((resolve,reject)=>resolve(`butter`));

    const getColdDrinks=new Promise((resolve,reject)=>resolve(`ColdDrink`));

    // let ticket = await promiseWifeBringingTicket;

    let [ticket,popcorn,butter]= await Promise.all([promiseWifeBringingTicket,getPopcorn,getButter]);

    console.log(`wife: i have the ${ticket}`);
    console.log(`husband: we should go in`);
    console.log(`wife: no i am hungry`);

    // let popcorn=await getPopcorn;

    console.log(`husbend: i got some ${popcorn}`);
    console.log(`husbend: we should go in`);
    console.log(`wife: i need butter on my ${popcorn}`);

    // let butter=await getButter;

    console.log(`husbend: i got some ${butter} on my ${popcorn}`);
    console.log(`husbend: anything else darling`);
    console.log(`wife: let's go we are getting late`);
    console.log(`husbend: thank you for the reminder *grins*`);
    console.log(`wife: wait wait i need ColdDrink please`);

    let ColdDrink=await getColdDrinks;

    console.log(`husbend: i got some ${ColdDrink} and all stuff`);
    console.log(`husbend: we are almost lated`);
    console.log(`wife: So, why we are waiting for, let's go`);

    return ticket;
};

preMovie().then((m)=> console.log(`person3: shows ${m}`));

console.log('person4: shows ticket');
console.log('oerson5: shws ticket');

//=================================================
//Convert the createPost , deletePost you wrote previously into async await completely.
//=================================================
const posts = [
    {title : 'Post 1',body : 'This is post One.',createdAt : new Date().getTime()},
    {title : 'Post 2',body : 'This is post Two.',createdAt : new Date().getTime()}
];

let intervalId = 0;

function getPosts(){
    clearInterval(intervalId);
    intervalId =  setInterval(() => {
        let output = '';
        posts.forEach((post)=>{
            let createdDate = new Date(post.createdAt);
            output+=`<li>${post.title} ----- Created At: ${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()} ----- Last updated: ${Math.trunc((new Date().getTime() - post.createdAt)/1000)} seconds ago ----- Last Activity: ${post.lastActivityTime}</li>`;
        });
        document.body.innerHTML = output;   
    },1000);
}


function createPost(post){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            posts.push({...post,createdAt : new Date().getTime()});
            // console.log(posts);
            updateLstActivityTime();
            const error = false;
            if(!error){
                resolve();
            }else{
                reject(`Error: Something went wrong.`);
            }
        },1000);
    });
}


function updateLstActivityTime(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            posts.forEach((post)=>{
                post.lastActivityTime=new Date().toLocaleDateString();
                resolve();
            })
        }, 1000);
    })
}

function deletePost(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(posts.length>0){
                resolve(posts.pop());
            }else{
                reject(`Array is empty.`);
            }
        },5000);
    });
}

getPosts();

const displayPost=async () =>{

    let post3=createPost({title : 'Post 3',body : 'This is post Three'});
    let post4=createPost({title : 'Post 4',body : 'This is post Four'});

    await post3;
    await post4;
    await deletePost();

    return getPosts();
}

displayPost();

//================================
