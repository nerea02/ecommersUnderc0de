import './card.css';

const Card = ({ image, name, price }) => {
    return (
        <div className='card'>
            <div className="sub-card">
                <img src={image} alt={name} className="image" />
                <div className="info">
                    <h2>{name}</h2>
                    <p className="price">${price}</p>
                    <button className="add-to-cart">Agregar al carrito</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
