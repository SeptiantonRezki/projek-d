import { GetStaticPaths, GetStaticProps, NextPageContext } from "next"

export default async function Login(){
    return <div></div>
}


Login.getIntialProps = async (ctx : NextPageContext) => {
    const json = await fetch('http://localhost:3000/api/person');
    return {people : json};
}

export const getStaticProps: GetStaticProps = async (ctx) => {   
    return { props : [{data : 'ok'}] };
}


export const getStaticPaths : GetStaticPaths<{id : string}> = async () => {
    return {
        fallback : true,
        paths : [
            { params : {id: '1'} } , { params : {id: '2'} }
        ]
    }
}