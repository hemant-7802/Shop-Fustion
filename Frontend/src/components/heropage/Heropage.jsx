import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

function Heropage() {
    const items = [
        {
            img:"https://i.postimg.cc/QCG6LDVp/jon-cellier-RUs-VVa57-VPI-unsplash.jpg"
        },
        {
            img:"https://i.postimg.cc/k5hJv1Dr/marie-michele-bouchard-SN6-HW62ub-LA-unsplash.jpg"
        }
    ]

    return (
        <Carousel className=''>
            {
                items.map((item, i) =>
                    // <Item key={i} item={item} />
                    <Paper className=''>
                        <img src={item.img} className='' />
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