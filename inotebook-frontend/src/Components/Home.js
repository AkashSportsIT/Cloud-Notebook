
import './Home.css';
import LoginHomeScreen from './LoginHomeScreen';
import LogOffHomeScreen from './LogOffHomeScreen';


const Home = () => {
    
    


    return (
        <>
            {
                localStorage.getItem('token') ? 
                    <LoginHomeScreen/>
                :
                    <LogOffHomeScreen/>
            }
        </>
    )
}

export default Home
