import React, { useContext, useState } from 'react';
import './index.css';
import { FiShoppingBag, FiShoppingCart, FiUser, FiLogOut, FiMenu, FiRotateCw } from 'react-icons/fi';
import Cart from '../Cart';
import Music from '../Music';

export default function Header({ Link, AuthContext, rota }) {
    const { user, signOut, cartSize, spots_ } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [isCart, setIsCart] = useState(false);
    const largura = window.innerWidth;

    return (
        <header id="header">

            <nav id="menu">
                {largura < 600 ?

                    <FiMenu id="menuIcon" onClick={() => setShow(!show)} />
                    :
                    <ul>
                        <li Style={rota === '/' && "background-color: #008648; border-Radius:5px;"}>
                            <Link to="/">
                                <p>Inicio</p>
                            </Link>
                        </li>

                        <li Style={rota === '/shop' && "background-color: #008648; border-Radius:5px;"}>
                            <Link to="/shop">
                                <p>Loja</p>
                            </Link>
                        </li>
                        {
                            user.admin &&
                            <li Style={rota === '/users' && "background-color: #008648; border-Radius:5px;"}>
                                <Link to="/users">
                                    <p>Usuário</p>
                                </Link>
                            </li>
                        }
                        {
                            user.admin &&
                            <li Style={rota === '/RescuesAdm' && "background-color: #008648; border-Radius:5px;"}>
                                <Link to="/RescuesAdm">
                                    <p>Pedidos</p>
                                </Link>
                            </li>
                        }
                    </ul>
                }

            </nav>

            {show &&
                <nav id="menuBurg">

                    <ul>
                        <li >
                            <Link to="/">
                                <p>Inicio</p>
                            </Link>
                        </li>

                        <li>
                            <Link to="/shop">
                                <p>Loja</p>
                            </Link>
                        </li>
                        {
                            user.admin &&
                            <li >
                                <Link to="/users">
                                    <p>Usuário</p>
                                </Link>
                            </li>
                        }

                    </ul>

                </nav>
            }


            <section id="areaInfo">
                <section id='areaIcon'>
                    {
                        !user.admin &&
                        <>
                            <Music AuthContext={AuthContext} />
                            <Link to="/rescues">
                                <FiShoppingBag className='icon' />
                            </Link>

                            <div id="cartArea" onClick={() => setIsCart(!isCart)}>
                                <FiShoppingCart className='icon' />
                                <p className="cicle">{cartSize}</p>
                            </div>

                        </>
                    }

                </section>

                <section id='areaProfile'>

                    {
                        user.admin && <h3 className='name'>R$: {(0.20 * spots_.kg).toFixed(2)}</h3>
                    }

                    <h3 className='name'>{user.name}</h3>
                    <FiUser className='icon' />
                    <FiRotateCw className='iconPower' onClick={() => window.location.replace('/')} />
                    <Link to="/">
                        <FiLogOut className='iconPower' onClick={signOut} />
                    </Link>
                </section>
                {isCart &&
                    <Cart AuthContext={AuthContext} />
                }

            </section>
        </header>
    )
}