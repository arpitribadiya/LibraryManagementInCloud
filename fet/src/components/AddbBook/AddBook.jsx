import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import login_img from "../../assets/login.jpg";
import axios from 'axios';

function AddBook() {

    const [bookName, setBookName] = useState('');
    const [category, setCategory] = useState('');
    const [edition, setEdition] = useState('');

    const [bookNameError, setBookNameError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [editionError, setEditionError] = useState('');
    const [blankFromError, setBlankFormError] = useState('');


    const nameRegEx = new RegExp('^[A-Za-z]+$');

    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if ('bookName' === name) {
            setBookName(value);
        } else if ('category' === name) {
            setCategory(value);
        } else if ('edition' === name) {
            setEdition(value);
        }
    }

    const handleInputValidation = async e => {
        const { name, value } = e.target;
        if ('bookName' === name) {
            if (!value) {
                setBookNameError('Enter book name');
                setDisabled(true);
            } else if (!value.match(nameRegEx)) {
                setBookNameError('Book name can contain only alphabets');
                setDisabled(true);
            } else {
                setBookNameError('');
                setDisabled(false);
            }
        } else if ('category' === name) {
            if (!value) {
                setCategoryError('Enter category name');
                setDisabled(true);
            } else if (!value.match(nameRegEx)) {
                setCategoryError('Category name can contain only alphabets');
                setDisabled(true);
            } else {
                setCategoryError('');
                setDisabled(false);
            }
        } else if ('edition' === name) {
            if (!value) {
                setEditionError('Enter book edition');
                setDisabled(true);
            } else {
                setEditionError('');
                setDisabled(false);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleInputValidation(e);
        if (bookNameError || categoryError || editionError) {
            setBlankFormError('Enter mandatory fields');
        } else {
            const book = {
                bookName: bookName,
                category: category,
                edition: edition,
            }
            setBlankFormError('');
            setBookName('');
            setCategory('');
            setEdition('');
            await axios.post(`http://${process.env.REACT_APP_BACKEND_URL}/librarians/addBook`, book)
                .then(res => {
                    navigate('/loginLibrarian');
                });
        }
    }

    return (
        <StyledSignupImgWrapper className="login-img-wrapper">
            <StyledForm className='form'>
                <div className='formContent'>
                    <div className='formTitle'>
                        <h3>Add Book</h3>
                    </div>

                    <div className='inputWrapper'>
                        <label className='formLabel'>Book Name*</label>
                        <input className='formInput' type='text' name='bookName' value={bookName} onChange={(e) => handleInputChange(e)} onBlur={handleInputValidation} placeholder='Book Name' />
                    </div>
                    <div className='err'>
                        {<span className='err'>{bookNameError}</span>}
                    </div>

                    <div className='inputWrapper'>
                        <label className='formLabel'>Category*</label>
                        <input className='formInput' type='text' name='category' value={category} onChange={(e) => handleInputChange(e)} onBlur={handleInputValidation} placeholder='Book Category' />
                    </div>
                    <div className='err'>
                        {<span className='err'>{categoryError}</span>}
                    </div>

                    <div className='inputWrapper'>
                        <label className='formLabel'>Email*</label>
                        <input className='formInput' type='text' name='edition' value={edition} onChange={(e) => handleInputChange(e)} onBlur={handleInputValidation} placeholder='Book Edition' />
                    </div>
                    <div className='err'>
                        {<span className='err'>{editionError}</span>}
                    </div>
                    <div className='footNote'>
                        <p>* Mandatory fields</p>
                    </div>

                    <div className='err'>
                        {<span className='blank-err'>{blankFromError}</span>}
                    </div>

                    <button disabled={disabled} className='registerBtn' type='submit' onClick={(e) => handleSubmit(e)}>Register</button>
                </div>
            </StyledForm>
            <StyledSignupImg className="login-img">
                <img src={login_img} alt="login_img" />
            </StyledSignupImg>
        </StyledSignupImgWrapper>
    )
}

const StyledSignupImgWrapper = styled.div`
    display: flex;
    width: 60%;
    box-shadow: 1px 1px 2px 2px #ccc;
    border-radius: 5px;
    margin: 1rem auto;
    padding: 3rem;
`


const StyledSignupImg = styled.div`
    flex-basis: 50%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const StyledForm = styled.form`
    margin:2rem auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 0 1rem;
    a{
        margin: 2rem;
        text-decoration: none;
        font-size: 1.5rem;
        text-align: center;
        color:  rgb(0, 127, 255);
    }
    .formContent {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .inputWrapper{
        display: flex;
        font-size: 1.5rem;
        flex-direction: column;
        gap: 1rem;
    }
    .inputWrapper > input {
        padding: 1rem;
        outline: none;
        border: none;
        box-shadow: 1px 1px 2px 2px #ccc;
        border-radius: 5px;
    }
    .err{
    padding: 0rem;
    color: red;
    font-size: small;
    text-align: right;
    }
    .registerBtn {
    width: fit-content;
    margin: 0 auto;
    padding: 0.5rem;
    background-color: rgb(16, 109, 240);
    border-radius: 5px;
    border:none;
    box-shadow: 1px 1px 1px 1px #ccc;
    color: white;
    letter-spacing: 1px;
    }
    .registerBtn:hover{
    cursor: pointer;
    }
    .registerBtn:disabled,
    .registerBtn[disabled]{
    cursor: not-allowed;
    color: #666666;
    background-color: #ccc;
    }
    .formTitle{
    text-align: center;
    font-size: 2rem;
    }
    .footNote{
    color: red;
    justify-content: left;
    font-size: small;
    padding: 0rem;
    }
`
export default AddBook;