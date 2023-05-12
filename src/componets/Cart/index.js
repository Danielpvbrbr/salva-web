import React, { useContext } from "react";
import './index.css';
import 'react-circular-progressbar/dist/styles.css';
import { FiShoppingCart, FiX } from 'react-icons/fi';

export default function Cart({ AuthContext, Link }) {
    const {
        user,
        myCart,
        deleteCart,
        updateSpots,
        Rescues,
    } = useContext(AuthContext);


    function sum() {
        var sum = 0;
        for (let el in myCart) {
            if (myCart.hasOwnProperty(el)) {
                sum += parseFloat(myCart[el].price);
            }
        }
        return (sum);
    };

    function confirm() {
        let ifSum = Math.sign(user.pt - sum());

        if (ifSum === -1) {
            alert('Pontos insuficientes');
        } else {
            for (let i in myCart) {
                Rescues({
                    id_user: user.id,
                    price: myCart[i].price,
                    name: user.name,
                    title: myCart[i].title,
                    image: myCart[i].image,
                    delivered: false,
                    order: false,
                    date: new Date()
                });
                deleteCart(myCart[i].id_cart);
            };

            updateSpots({
                id: user.id,
                kg: user.kg,
                pt: user.pt - sum(),
            });
            // window.location.replace('/');
        };
    };

    return (
        <div id='areaCart'>
            <section className='areaHeader'>
                <h3>Confirme seu resgate</h3>
            </section>
            <section className='areaBody'>
                {myCart.length >= 1 ?
                    myCart.map((v, i) =>
                        <div key={i}>
                            <section id="areaImg" >
                                <img
                                    src={v.image}
                                    alt={v.title}
                                    id="imgProduct"
                                />
                            </section>

                            <section id="areaInfo">
                                <h3>{v.title}</h3>
                            </section>

                            <section id="areaPrice">
                                <h3>{v.price}Pts</h3>
                                <FiX id="iconClose" onClick={() => deleteCart(v.id_cart)} />
                            </section>
                        </div>
                    )
                    :
                    <div id="containCart">
                        <FiShoppingCart id="iconCart" />
                        <p>Carrinho Vazio!</p>
                    </div>
                }
            </section>
            <section className='areaFooter'>
                <section id="info">
                    <div id="line">
                        <h3>Pontos disponivel</h3>
                        <h3>{user.pt}</h3>
                    </div>

                    <div id="line">
                        <h3>Total de Produtos</h3>
                        <h3 Style="color:#FF0000">{- sum()}</h3>
                    </div>

                    <div id="line">
                        <h3>Pontos após o resgate</h3>
                        <h3>{user.pt - sum()}</h3>
                    </div>
                </section>

                <section id="infoButton">
                    <button
                        disabled={sum() <= 0}
                        onClick={confirm}
                    >
                        Finalizar
                    </button>
                </section>
            </section>
        </div>
    )
} 