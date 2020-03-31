import React from 'react';
import Welcome from '../Welcome';

class Home extends React.Component{
    render(){
        return(
            <>  
                <div className="center-wrapper">
                    <Welcome/>
                </div>
            </>
        )
    }
}

export default Home;