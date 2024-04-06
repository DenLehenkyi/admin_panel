import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Products(){

    return (
            <Layout>

                <Link  className ='bg-blue-900 rounded-md text-white pt-1 py-1' href={'/products/new'}>Додати новий товар</Link>
            </Layout>
    )
}