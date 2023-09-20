import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



const News = (props) => {
    const [article, setArticle] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalArticle, setTotalArticle] = useState(0)
    useEffect(() => {
        const updateNews = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&&page=${page}&pageSize=${props.pageSize}`;
            props.setProgress(10);
            setLoading(true)
            let data = await fetch(url);
            props.setProgress(50);
            let parsedData = await data.json();
            console.log(parsedData)
            props.setProgress(70);
            document.title = `${props.category}- News24`;
            setArticle(parsedData.articles)
            setTotalArticle(parsedData.totalResults)
            setLoading(false)
            props.setProgress(100);
        }
        updateNews();
        //eslint-disable-next-line
    }, [])

    // const handlePreviousClick = async () => {
    //     console.log("P")
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
    //     setLoading(true)
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData)
    //     setArticle(parsedData.articles)
    //     setLoading(false)
    //     setPage(page-1)
       
    // }
    // const handleNextClick = async () => {
    //     if (page + 1 > Math.ceil(totalArticle / props.pageSize)) {

    //     }
    //     else {
    //         console.log("N")
    //         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    //         setLoading(true)
    //         let data = await fetch(url);
    //         let parsedData = await data.json();
    //         console.log(parsedData)
    //         setArticle(parsedData.articles)
    //     setLoading(false)
    //     setPage(page+1)
    //     }

    // }
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&&page=${page + 1}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        setArticle(article.concat(parsedData.articles))
        setTotalArticle(parsedData.totalResults)
        setPage(page+1)

    }

    return (
        <div className="container my-3">
            <h2 className='text-center' style={{ marginTop: "90px" }}>NEWS 24 - Top Headlines On {props.category} </h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={article.length}
                next={fetchMoreData}
                hasMore={article.length !== totalArticle}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row" >
                        {!loading && article.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title && element.title.slice(0, 40)} description={element.description && element.description.slice(0, 80)} imageUrl={element.urlToImage ? element.urlToImage : "https://www.hindustantimes.com/ht-img/img/2023/06/07/1600x900/brain_tumour_1686139657372_1686139670845.jpg"} hrefUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between ">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}> &larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalArticle / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
        </div>
    )

}
News.defaultProps = {
    pageSize: 12,
    country: "in"
}
News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string
}

export default News
