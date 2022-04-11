import axios from "axios";

const getData = (user_id, post_id) => {
    (async () => {
        const {data: user} = await axios(`https://jsonplaceholder.typicode.com/users/${user_id}`);

        const {data: posts} = await axios(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);

        const post = posts[post_id - 1];

        console.log(user);
        console.log(post);
    
    })();
};
    
export default getData;


