import React from 'react';

const Columns = (props) => {

    let columnsObj = {
        dimension: [],
        measure: []
    }

    props.columns.forEach(column => {
        columnsObj[column.function].push(
              <div
                  onDragStart={e => props.handleDragStart(e, column.name)}
                  draggable
                  className="draggable"
                  key={column.name}
              >
                  {column.name}
              </div>
          )
    });

    return (
        <div className="columns">
            <h3>Columns</h3>
            <div
                className="dimension">
                {columnsObj.dimension}
            </div>
            <div
                className="measure">
                {columnsObj.measure}
            </div>
        </div>
    );
}
 
export default Columns;