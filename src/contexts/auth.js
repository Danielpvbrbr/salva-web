import React, { useState, createContext, useEffect } from 'react';

import api from '../services/api';
import socket from '../services/socket';
import { format } from 'date-fns'

export const AuthContext = createContext({});
// eslint-disable-next-line import/first
import firebase from '../services/firebaseConnection';

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [newName, setNewName] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newAccount, setNewAccount] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [close, setClose] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [closeMap, setCloseMap] = useState(false);
    const [closeConfig, setCloseConfig] = useState(false);
    const [spots, setSpots] = useState([]);
    const [myCart, setMyCart] = useState([]);
    const [cartSize, setCartSize] = useState(0);
    const [myProduct, setMyProduct] = useState([]);
    const [listUsers, setListUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [addres, setAddres] = useState([]);
    const [addres_, setAddres_] = useState([]);
    const [showUser, setShowUser] = useState(false);
    const [spots_, setSpots_] = useState([]);
    const [showEditUser, setShowEditUser] = useState(false);
    const [key_, setKey_] = useState(null);
    const [loadPloads, setLoadPloads] = useState(false);
    const [imagePerfil, setImagePerfil] = useState([]);
    const [search, setSearch] = useState(null);
    const [groupPicker, setGroupPicker] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [recordsDate, setRecordsDate] = useState([]);
    const [dateNow, setDateNow] = useState(new Date());
    const [showLoading, setShowLoading] = useState(false);
    const [usersSize, setUsersSize] = useState(0);
    const [modalRescues, setModalRescues] = useState(false);
    const [myRescues, setMyRescues] = useState([]);
    const [myRescues_, setMyRescues_] = useState([]);
    const [limited, setLimited] = useState();
    const [show, setShow] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);

    // socket.on('connect', ()=>{

    // })
    // socket.on('rows', (rows)=>console.log(rows))

    useEffect(() => {
        async function loadingStorage() {
            socket.emit('sendCart', user && user.id);
            const storageUser = await localStorage.getItem('Auth_user');
            const storageAddres = await localStorage.getItem('addres');
            const storageSpots = await localStorage.getItem('spots');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setCloseMap(JSON.parse(storageAddres));
                setSpots_(JSON.parse(storageSpots));
            }
        }
        loadingStorage()
    }, []);

    function expiration() {
        const dd = format(new Date(), 'dd');
        const MM = format(new Date(), 'MM');
        // const yyy = format(new Date(), 'yyy');
        const chaves = ['04', '06', '09', '11'];

        if (chaves.indexOf(MM) !== -1) {
            if ((Number(dd.split('')[0])) === 0) {
                return (`0${Number(dd.split('')[1]) + 1}-${format(new Date(), 'MM-yyy')}`)
            } else {
                return (`${Number(dd) + 1}-${format(new Date(), 'MM-yyy')} `)
            }
        } else {
            if ((Number(dd.split('')[0])) === 0) {
                return (`0${Number(dd.split('')[1]) + 1}-${format(new Date(), 'MM-yyy')}`)
            } else {
                return (`01-0${Number(MM) + 1}-${format(new Date(), 'yyy')}`)
            }
        }

    };

    useEffect(() => {
        async function _() {
            const storageUser = await localStorage.getItem('Auth_user');

            if (storageUser) {
                if (JSON.parse(storageUser).expiration === format(new Date(), 'dd-MM-yyyy')) {
                    signOut();
                    console.log('Expiration')
                }
            }
        }
        _()

    }, []);

    useEffect(() => {
        api.get('/rescues')
            .then(res => {
                setMyRescues_(res.data);
                const recue = res.data.filter(person => person.id_user === user.id);
                setMyRescues(recue);
            })
    }, [user, isUpdate]);

    useEffect(() => {
        // socket.on('rescues', (data) => {
        //     setMyRescues_(data.data);
        //     const recue = data.data.filter(person => person.id_user === user.id);
        //     setMyRescues(recue);
        // });

        socket.on('cartAll', (data) => {
            setCartSize(data.length);
            setMyCart([]);
            data.forEach(value => {
                setMyCart(oldArray => [...oldArray, value]);
            });
        });

        socket.on('authAll', (data) => {
            setUsers(data);
            setUsersSize(data.length);
        });
    }, []);

    useEffect(() => {
        async function run() {
            if (users) {
                let filter = users.filter(person => person.id === user.id);
                filter.forEach(element => {
                    setListUsers(element);
                });

                await api.get('/location')
                    .then(res => {
                        // console.log(res)
                        let filter = res.data.filter(person => person.id === user.id);
                        filter.forEach(person => {
                            setAddres_(person);
                            setCloseMap(!!person);
                        });
                    })

                // await api.get('/rescues')
                //     .then(res => {
                //         setMyRescues_(res.data);
                //         const recue = res.data.filter(person => person.id === user.id);
                //         recue.forEach(value => {
                //             setMyRescues(value);
                //         });
                //     })
            };
        }
        run()
    }, [user, users]);



    //Cadastrar usuario
    async function signUp(resData) {
        // setLoading(true);
        const phonePerson = '+' + resData.phone;
        await api.post('/signUp', {
            phone: phonePerson,
            password: resData.password,
            name: resData.name,
            account: resData.account,
            status: true,
            admin: false,
            date: new Date(),
            pt: 0,
            kg: 0
        }).then(res => {
            //console.log(res)
            if (res.status === 201) {
                if (window.confirm('Telefone cadastrado, Tente outro ou Clicar em botão OK para acessa-la')) {
                    res.data.forEach(person => {
                        setUser(person);
                        storageUser({
                            account: person.account ? true : false,
                            admin: person.admin ? true : false,
                            date: person.date,
                            id: person.id,
                            name: person.name,
                            phone: person.phone,
                            status: person.status ? true : false,
                            pt: person.pt,
                            kg: person.kg,
                            expiration: expiration()
                        });
                        window.location.replace('/');
                    })
                }
            } else {
                res.data.forEach(person => {
                    setUser(person);
                    storageUser({
                        account: person.account ? true : false,
                        admin: person.admin ? true : false,
                        date: new Date(),
                        id: person.id,
                        name: person.name,
                        phone: person.phone,
                        status: person.status ? true : false,
                        pt: person.pt,
                        kg: person.kg,
                        expiration: expiration()
                    });

                    window.location.replace('/');
                });

            }
        })
    };

    async function signIn(phone, password) {

        const phonePerson = '+' + phone;
        await api.post('/signIn', {
            phone: phonePerson,
            password: password,
        }).then(res => {
            res.data.forEach(person => {
                setUser(person);
                storageUser({
                    account: person.account ? true : false,
                    admin: person.admin ? true : false,
                    date: person.date,
                    id: person.id,
                    name: person.name,
                    phone: person.phone,
                    status: person.status ? true : false,
                    pt: person.pt,
                    kg: person.kg,
                    expiration: expiration()
                });
            });
            runSpots()
        }).catch(err => {
            alert('Usuário ou senha incorrentos!')
        });
    };

    async function runSpots() {
        await api.get('/spots')
            .then(res => {
                let soma = 0;
                res.data.forEach(person => {
                    let kg = parseInt(person.kg)
                    soma += kg
                });
                localStorage.setItem('spots', JSON.stringify({ kg: soma }));
            })
    };

    function storageUser(data) {
        localStorage.setItem('Auth_user', JSON.stringify(data));
    };

    async function addAddres(data) {
        // setLoading(true);
        await api.post('/newLocation', {
            id: user && user.id,
            name: user && user.name,
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: data.latitudeDelta,
            longitudeDelta: data.longitudeDelta,
            city: data.city,
            country: data.country,
            district: data.district,
            num: data.num,
            road: data.road,
            state: data.state,
        }).then(res => {
            // console.log(res)
            setCloseMap(true);
            window.location.reload();
        })
        // setLoading(false);
        // setCloseMap(false);
    };

    async function updateRescues(data) {
        await api.post('/rescuesUp', {
            id: data.id,
            delivered: data.delivered,
            order_: data.order_,
        }).then(res => {
            setIsUpdate(!isUpdate);
        })
    };

    async function funcLocation(id) {
        await api.get('/location')
            .then(res => {
                const locat = res.data.filter(person => person.id === id);
                locat.forEach(value => {
                    setAddres(value);
                });
            })
    };

    async function Rescues(data) {
        await api.post('/rescues', {
            id_user: data.id_user,
            image: data.image,
            name: data.name,
            title: data.title,
            price: data.price,
            delivered: data.delivered,
            order: data.order,
            date: data.date
        }).then(res => {
            // window.location.reload();
        })
    };

    async function deletRescues(data) {
        setShowLoading(true);
        await firebase
            .firestore()
            .collection('Rescues')
            .doc(data)
            .delete()
            .then((res) => {
                setShowLoading(false);
            });
    };

    async function newCart(data) {
        await api.post('/newCart', {
            id_user: data.id_user,
            image: data.image.uri,
            title: data.title,
            price: data.price,
            qtd: data.qtd
        }).then(res => {
            // console.log(res)
            socket.emit('sendCart', user && user.id);
            socket.on('cartAll', (data) => {
                setCartSize(data.length);
                setMyCart([]);
                data.forEach(value => {
                    setMyCart(oldArray => [...oldArray, value]);
                });
            });
        })
    };

    async function deleteCart(data) {
        await api.delete(`/deleteCart/${data}`)
            .then(() => {
                socket.emit('sendCart', user && user.id);
            })
    };

    function deleteAllUsers(id) {
        api.delete(`/deleteAll/${id}`);
        window.location.replace('/');
    };

    async function records(data) {
        await api.post('/records', {
            id_user: data.id_user,
            type: data.type,
            price: data.price,
            date: dateNow
        }).then(res => {
            // window.location.reload();
        })
    };

    useEffect(() => {
        async function getProduct() {
            await firebase.firestore()
                .collection('Product')
                // .limit(6)
                .get()
                .then(querySnapshot => {
                    setMyProduct([]);
                    querySnapshot.forEach(documentSnapshot => {
                        let data = {
                            key: documentSnapshot.id,
                            price: documentSnapshot.data().price,
                            freight: documentSnapshot.data().freight,
                            title: documentSnapshot.data().title,
                            image: documentSnapshot.data().image,
                        };
                        setMyProduct(oldArray => [...oldArray, data]);
                    });
                });
        };
        getProduct();
    }, [usersSize]);

    async function delProduct(data) {
        await firebase
            .firestore()
            .collection('Product')
            .doc(data)
            .delete()
            .then((res) => {
                alert('Produto Deletado com sucesso!')
            });
    };

    async function updateProduct(data) {
        setLoadPloads(true);
        await firebase
            .firestore()
            .collection('Product')
            .doc(data.key)
            .update({
                title: data.title,
                price: data.price,
            }).then((res) => {
                setLoadPloads(false);
                alert("Alteração realizado com sucesso!");
            })
    };

    async function updateUsers(data) {
        await api.post('/auth', {
            id: data.id,
            name: data.name,
            phone: data.phone,
            account: data.account,
            status: data.status,
            admin: data.admin
        }).then(res => {
            alert('Atualizado com sucesso!')
        })
    };

    async function updateLocation(data) {
        await api.post('/locationUp', {
            id: data.id,
            city: data.city,
            road: data.road,
            district: data.district,
            num: data.num,
            state: data.state
        }).then(res => {
            alert('Atualizado com sucesso!')
            setLoading(false);
        })

    };

    async function updateSpots(data) {
        await api.post('/spots', {
            id: data.id,
            pt: data.pt,
            kg: data.kg
        }).then(async res => {
            setLoading(false);
            let filter = await users.filter(person => person.id === data.id);
            await filter.forEach(element => {
                storageUser({
                    account: element.account ? true : false,
                    admin: element.admin ? true : false,
                    date: element.date,
                    id: element.id,
                    name: element.name,
                    phone: element.phone,
                    status: element.status ? true : false,
                    pt: data.pt,
                    kg: element.kg
                })
            });
            window.location.reload();
        })

    };


    async function uploadImage(data) {
        setLoadPloads(true);
        const ref = firebase
            .storage()
            .ref('product/')
            .child(data.title)
        ref.put(data.image,
            {
                contentType: 'image/jpeg'
            }
        ).then(async () => {

            const urlGet = await firebase
                .storage()
                .ref()
                .child(`product/${data.title}`);
            urlGet.getDownloadURL().then(async (url) => {
                await firebase
                    .firestore()
                    .collection('Product')
                    .doc()
                    .set({
                        title: data.title,
                        price: data.price,
                        image: {
                            uri: url,
                        },
                        freight: 'Entregar na próxima coleta'
                    }).then((res) => {
                        alert("Produto Cadastrado!");
                        setLoadPloads(false);
                    })
            })
        })

    };

    async function signOut() {
        // await firebase.auth().signOut();
        await localStorage.clear();
        setUser(null);
        window.location.reload();

    };
    // signOut() 


    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            newName,
            newPass,
            loading,
            phoneNumber,
            newAccount,
            err,
            close,
            modalShow,
            closeMap,
            closeConfig,
            spots,
            myCart,
            myProduct,
            cartSize,
            listUsers,
            users,
            addres,
            addres_,
            showUser,
            spots_,
            showEditUser,
            key_,
            loadPloads,
            imagePerfil,
            search,
            groupPicker,
            selectedGroup,
            recordsDate,
            dateNow,
            showLoading,
            usersSize,
            modalRescues,
            myRescues,
            limited,
            myRescues_,
            show,
            autoPlay,
            signIn,
            signUp,
            setPhoneNumber,
            signOut,
            setNewName,
            setNewPass,
            setNewAccount,
            setErr,
            setModalShow,
            setClose,
            setCloseMap,
            addAddres,
            setCloseConfig,
            setSpots,
            newCart,
            setMyCart,
            deleteCart,
            updateUsers,
            updateLocation,
            updateSpots,
            setShowUser,
            setKey_,
            setShowEditUser,
            uploadImage,
            delProduct,
            setImagePerfil,
            setSearch,
            setGroupPicker,
            setSelectedGroup,
            records,
            setDateNow,
            Rescues,
            setModalRescues,
            setLimited,
            updateRescues,
            updateProduct,
            deletRescues,
            setShow,
            funcLocation,
            deleteAllUsers,
        }}>
            {children}

        </AuthContext.Provider>
    );
}
