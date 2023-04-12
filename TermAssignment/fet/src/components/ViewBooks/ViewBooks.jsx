import React, { useState } from 'react'
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';


function ViewBooks() {
    let { state } = useLocation();
    const [currentState, setCurrentState] = useState(state);
    
    const booksColumns = [
        {
            name: 'Book Name',
            selector: row => row.bookName,
            sortable: true,
        },
        {
            name: 'Book Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Book Edition',
            selector: row => row.edition,
        }
    ];

    return (
        <StyledDiv>
            <div class="dashboard-content">
                <div class="table-heading">
                    <h1>Book List</h1>
                </div>
                <DataTable
                    columns={booksColumns}
                    data={currentState}
                    pagination
                />
            </div>
        </StyledDiv>
    )
};


const StyledDiv = styled.div`
  min-height: 100vh;
 .dashboard-content{
    position: relative;
    height: 400px;
    left: 0;
    padding-left: 12px;
    padding-right: 12px;
    right:0px;
    top: 50px;
    }
  .koyePV {
    font-size: 22px;
    }
  .kMJmMa {
    font-size: 20px;
    }
  .table-heading{
    display: flex;
    justify-content: space-between;
}
.table-heading h3{
    margin: 12px ;
    width: 50%;
}
.search-bar{
    width: 30%;
    float: right;
    margin:12px;
}
.search-bar input{
    width: auto;
    float: right;

}
.button-packed{
    background-color:yellow;
    color:black;
}
.button-picked{
    background-color:green;
    color:white;
}
`;

export default ViewBooks
