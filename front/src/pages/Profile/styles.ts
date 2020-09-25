import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    width: 100%;
    max-width: 1180px;
    padding: 0 30px;
    margin: 32px auto;

    header{
        display: flex;
        align-items: center;
    }

    header img{
        height: 120px;
    }
    span{
        font-size: 20px;
        margin-left: 24px;
    }
    header a{
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        font-family: Arial;

        display: block;
        height: 40px;
        line-height: 40px;
        padding: 10px 5px;
    
        width: 260px;
        margin-left: auto;
        margin-top: 0;
        height: 60px;
        background: #FF9000;
        border-radius: 10px;
        color: #FFF;

        &: hover {
            background: ${shade(0.2, '#FF9000')};  
        }
    }
    header button {
        height: 60px;
        width: 60px;
        border-radius: 4px;
        border: 1px solid #dcdce6;
        background: transparent;
        margin-left: 16px;
        transition: border-color 0.2s;
        background: #FFF;
    }
    header button:hover{
        border-color: #999 ;
    }

    h1{
        margin-top: 80px;
        margin-bottom: 24px;
    }

    ul{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 24px;
        list-style: none;
    }
    
    ul li{
        background: #fff;
        padding: 24px;
        border-radius: 8px;
        position: relative;
    }
    
    ul li button{
        position: absolute;
        right: 24px;
        top: 24px;
        border: 0;
    }
    
    ul li button:hover{
        opacity: 0.8;
    }
    
    ul li strong{
        display: block;
        margin-bottom: 16px;
        color: #41414d;
    }
    
    ul li p + strong{
        margin-top: 32px;
    }
    
    ul li p{
        color: #737380;
        line-height: 21px;
        font-size: 16px;
    }

`;