import React from 'react'
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle, Container, Grid, Box, Paper, Button, Input, TextField, CssBaseline } from '@material-ui/core'
import { getProfile,getAddress,updateUser,updatePassword,updateAddress,addAddress } from '../services/ApiService'
import userImage from '../assets/img/defaultuser.png'
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import localStorageService from '../services/localStorageService';
import { TramRounded } from '@material-ui/icons';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
        
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        margin: theme.spacing(3),
    },
    pd: {
        marginRight:'10px',
        marginLeft:'10px'
    },
    mb: {
        marginBottom: '10px',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Profile() {
    const classes = useStyles();
    const [address, setAddress] = React.useState({
        adresse:'',
        compementAdresse:'',
        ville:'',
        codePostal:'',
        user:{}
    });
    const[isAddress,setIsAddress]=React.useState(false);
    const[alert,setAlert]=React.useState(false);
    const[alertMessage,setAlertMessage]=React.useState('');
    const[alertType,setAlertType]=React.useState('');
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [user, setUser] = React.useState({
        id:'',
        activiteKbis:'',
        capitalSocial:'',
        codeApe:'',
        codeRcs:'',
        dateCotureExerciceSocial:'',
        dateDebutActiviteKbis:'',
        dateImmatriculation:'',
        dateNaissance:'',
        email:'',
        emailEntreprise:'',
        image:'',
        immatriculationAuRcs:'',
        lienSite:'',
        nomEntreprise:'',
        numSiren:'',
        numSiret:'',
        numTvaIntracommunautaire:'',
        password:'',
        role:'user',
        situationDossier:'',
        telephone:'',
        userName:'',
    });

    React.useEffect(() => {
        getProfile().then(data => {
            setUser(data.data);
            console.log(data.data)
        });

        getAddress().then(data=>{
            setAddress(data.data);
            setIsAddress(true)
        }).catch(function (error){
            setIsAddress(false)
        })

    }, []);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleClickOpen2 = () => {
        setOpen2(true);
      };
    
      const handleClose2 = () => {
        setOpen2(false);
      };

    async function onChnageEvent(e){
        setUser({...user,[e.target.name]:e.target.value});
        await console.log(user.email)
    }

    async function onAddressChnageEvent(e){
        setAddress({...address,[e.target.name]:e.target.value});
        await console.log(address)
    }
    
    async function update(){
        updateUser(user).then(data=>{
            setAlert(true);
            setAlertMessage("Sucessfully Updated");
            setAlertType("success");
        }).catch(error=>{
            setAlert(true);
            setAlertMessage("Error on Update !");
            setAlertType("error");
        })
    }

    async function onPasswordChnageEvent(e){
        setPassword(e.target.value);
        
    }

    async function updatePasswordFun(){
    //    let req=JSON.stringify(password.replace(/"([^"]+(?="))"/g, '$1'))
       let pass=password;

       await updatePassword(password).then(data=>{
            localStorageService.setItem("password",pass);
            setAlert(true);
            setAlertMessage("Password Updated");
            setAlertType("success");
        }).catch(error=>{
            setAlert(true);
            setAlertMessage("Error on Update !");
            setAlertType("error");
        })

        setOpen(false);
    }

    async function updateAddressFun(){
        //    let req=JSON.stringify(password.replace(/"([^"]+(?="))"/g, '$1'))
           
        if(isAddress){
            await updateAddress(address).then(data=>{
                setAlert(true);
                setAlertMessage("Address Updated");
                setAlertType("success");
            }).catch(error=>{
                setAlert(true);
                setAlertMessage("Error on Update !");
                setAlertType("error");
            })
            
            
        }else{
            setAddress({...address,user:user});
            let addressTemp={
                adresse:address.adresse,
                compementAdresse:address.compementAdresse,
                ville:address.ville,
                codePostal:address.codePostal,
                user:user
            }
            await addAddress(addressTemp).then(data=>{
                setAlert(true);
                setAlertMessage("Address added");
                setAlertType("success");
            }).catch(error=>{
                setAlert(true);
                setAlertMessage("Error on Update !");
                setAlertType("error");
            })
        }

        setOpen2(false);
    }
           

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline/>
            <Grid container >
                {alert && <Alert severity={alertType} onClose={() => {setAlert(false)}} style={{width:'80%'}}>{alertMessage}</Alert>}
                <div className={classes.form}>
                    <form noValidate autoComplete="off" onSubmit={update}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} lg={6}>
                                <div style={{ borderRadius: '50%' }}>
                                    {user.image ?
                                        <img height='150px' width='150px' src={user.image} alt="img" />
                                        :
                                        <img height='150px' width='150px' src={userImage} alt="img" />
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                 <div style={{textAlign:'left'}}>
                                     <h2>{user.userName}</h2>
                                     <h2>{!isAddress &&'No address'} 
                                     {isAddress && (address.adresse+' '+address.compementAdresse+' '+address.ville+' '+address.codePostal) }
                                     {isAddress ?
                                     <IconButton color="primary" onClick={handleClickOpen2}>
                                        <EditOutlinedIcon style={{ fontSize: 17 }} />
                                        </IconButton>
                                     
                                    :
                                    <Button variant="outlined" onClick={handleClickOpen2}>
                                     Add Address
                                    </Button>
                                    }   
                                    </h2>
                                     <Button variant="outlined" onClick={handleClickOpen}>
                                     Change Password
                                    </Button>
                                     
                                 </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item xs={12} lg={6} >
                                <TextField name="userName" value={user.userName} onChange={onChnageEvent} id="outlined-basic" label="User Name" variant="outlined" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField name="email" value={user.email} onChange={onChnageEvent} id="outlined-basic" label="Email" variant="outlined" fullWidth={true} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item xs={12} lg={6} >
                                <TextField name="telephone" value={user.telephone} onChange={onChnageEvent} id="outlined-basic" label="Telephone" variant="outlined" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField name="lienSite" value={user.lienSite} onChange={onChnageEvent} id="outlined-basic" label="Lien Site" variant="outlined" fullWidth={true} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8}>
                            <Grid item xs={12} lg={6} >
                                <TextField name="activiteKbis" value={user.activiteKbis} onChange={onChnageEvent} id="outlined-basic" label="Activite Kbis" variant="outlined" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField name="capitalSocial" value={user.capitalSocial} onChange={onChnageEvent} id="outlined-basic" label="Capital Social" variant="outlined" fullWidth={true} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={8}>
                            <Grid item xs={12} lg={6} >
                                <TextField name="codeApe" value={user.codeApe} onChange={onChnageEvent} id="outlined-basic" label="Code Ape" variant="outlined" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField name="codeRcs" value={user.codeRcs} onChange={onChnageEvent} id="outlined-basic" label="Code Rcs" variant="outlined" fullWidth={true} />
                            </Grid>
                        </Grid>            

                        <Grid container spacing={8}>
                            <Grid item xs={12} lg={6} >
                                <TextField name="emailEntreprise" value={user.emailEntreprise} onChange={onChnageEvent} id="outlined-basic" label="email Entreprise" variant="outlined" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField name="nomEntreprise" value={user.nomEntreprise} onChange={onChnageEvent} id="outlined-basic" label="Nom Entreprise" variant="outlined" fullWidth={true} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={8}>
                            <Grid item xs={12} lg={6} >
                                <TextField name="numSiren" value={user.numSiren} onChange={onChnageEvent} id="outlined-basic" label="Num Siren" variant="outlined" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField name="numSiret" value={user.numSiret} onChange={onChnageEvent} id="outlined-basic" label="Num Siret" variant="outlined" fullWidth={true} />
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={8}>
                            <Grid item xs={12} lg={6} >
                                <TextField name="numTvaIntracommunautaire" value={user.numTvaIntracommunautaire} onChange={onChnageEvent} id="outlined-basic" label="Num TvaIntracommunautaire" variant="outlined" fullWidth={true} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField name="situationDossier" value={user.situationDossier} onChange={onChnageEvent} id="outlined-basic" label="Situation Dossier" variant="outlined" fullWidth={true} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} >
                        <Grid item xs={12} lg={6} style={{textAlign:'left'}} ></Grid>
                            <Grid item xs={12} lg={6} style={{textAlign:'right'}} >
                            <Button variant="contained" color="primary" onClick={update} >Update</Button>
                            </Grid>
                        </Grid>

                        <Dialog
                            open={open}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Do you want change the password?"}</DialogTitle>
                            <DialogContent>
                                <TextField name="password" value={password} onChange={onPasswordChnageEvent} id="outlined-basic" label="New Password" variant="outlined" fullWidth={true} />
                                
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={updatePasswordFun}>Update</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            open={open2}
                            keepMounted
                            onClose={handleClose2}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Do you want change the password?"}</DialogTitle>
                            <DialogContent>
                                <div style={{marginTop:'5px'}}>
                                    <TextField name="adresse" value={address.adresse} onChange={onAddressChnageEvent} id="outlined-basic" label="Adresse" variant="outlined" fullWidth={true} />
                                </div>

                                <div style={{marginTop:'5px'}}> 
                                    <TextField name="compementAdresse" value={address.compementAdresse} onChange={onAddressChnageEvent} id="outlined-basic" label="Compement Adresse" variant="outlined" fullWidth={true} />
                                </div>

                                <div style={{marginTop:'5px'}}>
                                    <TextField name="ville" value={address.ville} onChange={onAddressChnageEvent} id="outlined-basic" label="Ville" variant="outlined" fullWidth={true} />
                                </div>

                                <div style={{marginTop:'5px'}}>
                                    <TextField name="codePostal" value={address.codePostal} onChange={onAddressChnageEvent} id="outlined-basic" label="Code Postal" variant="outlined" fullWidth={true} />
                                </div>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose2}>Disagree</Button>
                            <Button onClick={updateAddressFun}>Update</Button>
                            </DialogActions>
                        </Dialog>

                    </form>
                </div>
            </Grid>
           
        </Container>
    )
}


// $2a$12$rrSgm9qjv.hiz.o20rgg/u4.Y7RdDirAF9OxfqqoV.7B8tP6dO1rK