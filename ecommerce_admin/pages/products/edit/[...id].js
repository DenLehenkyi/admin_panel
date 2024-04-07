import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from 'axios'
export default function EditProductPage(){
    const router = useRouter();
    const {id} = router.query;
    if(!id){
        return;
    }
    useEffect(() =>{
        axios.get('/api/products?id='+id).then(response =>{
            console.log(response.data);
        })
    }, [id]);
    return(
        <Layout>
            Edit Product
        </Layout>
    );
}