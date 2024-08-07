const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    fontSize: '30px',
    color: '#da0404',
  
    
};

function Loading(){
    return (
        <div style={loadingStyle}>
            <p>Loading...</p>
        </div>
    )
}

export default Loading