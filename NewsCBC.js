import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
    articles = [
        {
            "source": {
                "id": "news-com-au",
                "name": "News.com.au"
            },
            "author": "Andrew McMurtry",
            "title": "Bombshell call leaves cricket in shock",
            "description": "<p>India were left with a no-win proposition heading into the World Test Championship Final against Australia, dropping the world No. 1 ranked bowler Ravichandran Ashwin.</p>",
            "url": "https://www.news.com.au/sport/cricket/india-have-made-a-mistake-bombshell-call-shocks-cricket-world/news-story/9a66a128015063f4c351ebbc655f094a",
            "urlToImage": "https://content.api.news/v3/images/bin/5c4a88c000f4d6dd2bb412dbfb96d0bf",
            "publishedAt": "2023-06-07T12:45:00Z",
            "content": "India were left with a no-win proposition heading into the World Test Championship Final against Australia, dropping the world No. 1 ranked bowler Ravichandran Ashwin.\r\nFacing a green top at The Oval… [+3627 chars]"
        },
        {
            "source": {
                "id": "news-com-au",
                "name": "News.com.au"
            },
            "author": "Andrew McMurtry",
            "title": "‘Don’t look down’: Test final pitch stuns",
            "description": "<p>After two years and 69 Test matches, Australia and India will play off for the chance to be crowned Test cricket world champions in the World Test Championship Final from The Oval in London.</p>",
            "url": "https://www.news.com.au/sport/cricket/world-test-championship-final-day-1/news-story/5efb2f50fe2588e134d7e4a9ddbafa66",
            "urlToImage": "https://content.api.news/v3/images/bin/fce596f4fd8d7cc7654a5b24f4ba9c4d",
            "publishedAt": "2023-06-07T09:03:00Z",
            "content": "After two years and 69 Test matches, Australia and India will play off for the chance to be crowned Test cricket world champions in the World Test Championship Final from The Oval in London.\r\nIndia, … [+2974 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]
    constructor() {
        super();
        console.log("This is constructor from NewsItem")
        this.state = {
            article: [],
            page: 1,
            loading: false,
            totalArticle: 0
        }

    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(10);
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        console.log(parsedData)
        this.props.setProgress(70);
        document.title = `${this.props.category}- News24`;
        this.setState({
            article: parsedData.articles,
            totalArticle: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    handlePreviousClick = async () => {
        console.log("P")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            page: this.state.page - 1,
            article: parsedData.articles,
            loading: false,

        })
    }
    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalArticle / this.props.pageSize)) {

        }
        else {
            console.log("N")
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData)
            this.setState({
                page: this.state.page + 1,
                article: parsedData.articles,
                loading: false
            })
        }

    }
    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            article: this.state.article.concat(parsedData.articles),
            totalArticle: parsedData.totalResults,
        })

    }

    static defaultProps = {
        pageSize: 12,
        country: "in"
    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string
    }
    render() {
        return (
            <div className="container my-3">
                <h2 className='text-center' style={{marginTop:"90px"}}>NEWS 24 - Top Headlines On {this.props.category} </h2>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalArticle}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row" >
                            {!this.state.loading &&  this.state.article.map((element) => {
                                return <div className="col-md-3" key={element.url}>
                                    <NewsItem title={element.title && element.title.slice(0, 40)} description={element.description && element.description.slice(0, 80)} imageUrl={element.urlToImage ? element.urlToImage : "https://www.hindustantimes.com/ht-img/img/2023/06/07/1600x900/brain_tumour_1686139657372_1686139670845.jpg"} hrefUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between ">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticle / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News
