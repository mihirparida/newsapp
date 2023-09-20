// import React, { Component } from 'react'
import React from 'react'

// export class NewsItem extends Component {
const NewsItem = (props) => {

    // render() {
    // let { title, description, imageUrl, hrefUrl, author, date } = this.props;
    let { title, description, imageUrl, hrefUrl, author, date } = props;

    return (
        <div className='my-3'>
            <div className="card" >
                {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ left: "70%" }}>
                            {this.props.source} </span> */}
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...<span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "50%" }}>
                        {props.source} </span></h5>
                    <p className="card-text">{description}...</p>
                    <p className="text-primary"><small className="text-success">By {!author ? "Author-Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={hrefUrl} className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
    // }
}

export default NewsItem
