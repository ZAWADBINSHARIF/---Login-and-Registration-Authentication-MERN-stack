// external import
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Row } from 'react-bootstrap'

// internal import
import { useGetProductsMutation } from '../slices/productApiSlice'
import { setProducts } from '../slices/productSlice'
import CardView from '../components/CardView'

const Feeds = () => {
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [getProducts, { isLoading }] = useGetProductsMutation()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts().unwrap()
                dispatch(setProducts([...response.products]))
            } catch (error) {
                console.log(error)
            }
        }
        fetchProducts()
    }, [getProducts, dispatch])

    return (
        <main>
            <Row className='pt-5'>
                {products.map((product, index) => (
                    <CardView
                        key={index}
                        title={product.title}
                        description={product.description}
                    />
                ))}
            </Row>
        </main>
    )
}
export default Feeds