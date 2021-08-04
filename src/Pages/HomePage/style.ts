import styled from "styled-components";
import HomeWallpaper from "../../Assets/Images/HomeWallpaper.png"

export const HomeDiv = styled.div`
    display: flex;
    flex-wrap: wrap;

`

export const HomeAside = styled.aside`
    height: 100vh;

    img{
        height: 100%;
    }

    @media only screen and (max-width: 1565px){
        img{
            display: none;
        }
    }

`
export const HomeLogo = styled.div`
    background-color: white;
    border-radius: 30rem;

    img{
        width: 100%;
    }

`

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;

    margin: 0px auto;

    padding: 15px 20px;

    @media only screen and (max-width: 539px){
        height: 100vh;
        justify-content: space-evenly;

        background-image: url(${HomeWallpaper});
        background-position: center;
        background-size: contain;

        
    }
`