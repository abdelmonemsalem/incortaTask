import React from 'react';

const Inquiry = (props) => {

    let inquiryObj = {
        dimension: [],
        measure: []
    }

    props.inquiry.forEach(item => {
        inquiryObj[item.function].push(
            <div
                className="draggable"
                key={item.name}
            >
                {item.name}
            </div>
        )
    });
    return (
        <div 
            onDragOver={e => props.handleDragOver(e)}
            onDrop={e => props.handleDrop(e)}
            className="inquiry"
        >
            <div
                className="inquiryDimension">
                <h3>Dimension</h3>
                <div>
                    {inquiryObj.dimension}
                </div>
                <button onClick={() => props.handleClear('dimension')}>Clear</button>
            </div>
            <div
                className="inquiryMeasure">
                <h3>Measure</h3>
                <div>
                    {inquiryObj.measure}
                </div>
                <button onClick={() => props.handleClear('measure')}>Clear</button>
            </div>
        </div>
    );
}
 
export default Inquiry;