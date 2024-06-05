import { useNavigate } from "react-router";

// category 
const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png',
        name: 'Fashion'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png',
        name: 'shirt'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png',
        name: 'jacket'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
        name: 'mobile'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png',
        name: 'laptop'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
        name: 'shoes'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png',
        name: 'home'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png',
        name: 'books'
    }
]

const Category = () => {
    // naviaget 
    // const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col py-16 sm:py-20">
                <div className="flex overflow-x-scroll lg:justify-center  hide-scroll-bar">
                    <div className="flex ">
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-6 lg:px-8">
                                    <div onClick={() => navigate(`/category/${item.name}`)} className=" w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full overflow-hidden bg-sky-100 transition-all hover:bg-sky-300 hover:scale-110 cursor-pointer mb-1 duration-500" >
                                        <div className="flex justify-center items-center">
                                            <img src={item.image} alt="img" width={90} />
                                        </div>
                                    </div>

                                    <h1 className=' text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase font-mono'>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
        </>
    );
}

export default Category;