import { useEffect, useState } from 'react'
import MyMap from '../components/MyMap'

const Home = () => {
    const [postcodes, setPostcodes] = useState(null)
    useEffect(() => {
        const fetchPostcodes = async () => {
            const response = await fetch('/api/postcodes')
            const json = await response.json()

            if (response.ok) {
                setPostcodes(json)
            }
        }

        fetchPostcodes()
    }, [])

    return (
        <div className="home">
            <div className='postcodes'>
                {/* {postcodes && postcodes.map((postcode) => (
                    <p key={postcode._id}>{postcode.postcode} {postcode.lat} {postcode.long}</p>
                ))} */}

            </div>
            <MyMap/>
        </div>
    )
}

export default Home