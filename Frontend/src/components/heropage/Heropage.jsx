import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

function Heropage() {
    const items = [
        {
            img: "https://i.ytimg.com/vi/II0cF9hFQ_g/maxresdefault.jpg"
        },
        {
            img: "https://img.freepik.com/premium-psd/black-friday-sale-social-media-post-instagram-post-web-banner-facebook-cover-template_220443-1074.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1715990400&semt=ais_user"
        }
    ]

    return (
        <Carousel className='' animation='slide' duration={1000} IndicatorIcon={false}>
            {
                items.map((item, i) =>
                    // <Item key={i} item={item} />
                    <Paper className='overflow-hidden' key={item.img}>
                        <img src={item.img} className='w-full h-44 sm:h-64 sm:object-cover' />
                    </Paper>
                )
            }
        </Carousel>
    )
}

// function Item(props) {
//     return (
//         <Paper>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>

//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }

export default Heropage