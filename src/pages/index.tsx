import { GetStaticProps } from "next";
import { openDB, Car } from "../openDB";
import Link from "next/link"


export interface IndexProps { cars: Car[] }

export default function Index({ cars }: IndexProps) {
    // const { data } = useSWR('/some-endpoint'); ??

    return (
        <div>
            <h1>okok</h1>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ctx => {
    
    // const currentPage = ctx.params?.currentPage as string;
    // const currentPageNumber = +(currentPage || 0);

    // const min = currentPageNumber * 5;
    // const max = (currentPageNumber + 1) * 5;

    const db = new openDB();
    const carDB = new Car(db);

    const cars = await carDB.getAllCar();
    
    return { props: { cars } };
}


// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     return {props : dataCar};
// }