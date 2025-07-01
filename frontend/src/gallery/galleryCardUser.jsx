const  galleryCardUser = ({ drawing, onClick }) => {
    return (
        <div className="galleryCard" onClick={onClick}>
        <img src={"http://localhost:3000/api/portraits/" + drawing.Source} alt={drawing.Source} />
        <h2>{drawing.Name}</h2>
        <p>{drawing.Description}</p>
        </div>
    );
}

export default galleryCardUser;