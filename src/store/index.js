import { proxy } from "valtio";

const state=proxy({
    userId:'',
    userName:'',
    userEmail:'',
    isLoggeIn:false
})

export default state;