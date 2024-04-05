import { useEffect, useState } from "react";
import Header from "./Header";

export default function Home() {

    const [globalFeed, setGlobalFeed] = useState([]);
    const [tag, setTags] = useState([]);

    useEffect(() => {
        fetch('https://api.realworld.io/api/articles')
            .then(res => setGlobalFeed(res.data))
    }, [])

    useEffect(() => {
        fetch('https://api.realworld.io/api/tags')
            .then(res => setTags(res.data))
    }, [])

    return (
        <>
            <Header />
            <div className="container ">
                <div className="border-bottom mt-5 text-success">
                    Global Feed
                </div>
            </div>
        </>
    )
}