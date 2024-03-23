import { useEffect, useState } from 'react';
import './CRUD.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const apiUrl = 'http://localhost:5050';
const Crud = () => {
    let [btnValue, btnValueFn] = useState('Save');
    let [firstNameValue, firstNameFn] = useState('');
    let [emailValue, emailFn] = useState('');
    let [phoneValue, phoneFn] = useState('');
    let [editId, editIdFn] = useState('');
    let [dataArr, dataArrFn] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const sendValue = async () => {
        if (btnValue == 'Save') {
            console.log("btn value is save");
            try {

                let data: any = {
                    name: firstNameValue,
                    email: emailValue,
                    phone: phoneValue
                }
                const res = await fetch(apiUrl + '/saveData', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                const response = await res.json();
                console.log("res of post api", response);
                if (response.statuscode == 200) {
                    firstNameFn('');
                    emailFn('');
                    phoneFn('');
                    await getData();
                }
            } catch (error) {
                throw error;
            }
        } else {
            console.log("btn value is update");
            let id = editId;
            let data: any = {
                name: firstNameValue,
                email: emailValue,
                phone: phoneValue
            }

            const res = await fetch(apiUrl + '/updateDetails/' + id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })

            const response = await res.json();
            console.log("response of update data",response);
            if(response.statuscode == '200'){
                getData();
                cancel();
            }
            
        }
    }

    const getData = async () => {
        try {

            const res = await fetch(apiUrl + '/getData', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const response = await res.json();
            console.log("res of getData", response);
            dataArrFn(response.data);
        } catch (error) {
            throw error;
        }
    }

    const editData = (data: any) => {
        console.log("edit data", data);

        firstNameFn(data.name);
        emailFn(data.email);
        phoneFn(data.phone);
        editIdFn(data._id);
        btnValueFn('Update');
    }

    const cancel = () => {
        firstNameFn('');
        emailFn('');
        phoneFn('');
        btnValueFn('Save')
    }

    const deleteData = async (id:any) => {
        let verify = confirm("Are you sure want to delete ?");
        if(verify){
            let res = await fetch(apiUrl+ '/deleteData/'+id, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const response = await res.json();
            console.log("delete res",response);
            if(response.statuscode == 200){
                getData();
            }
            
        }
    }

    return (
        <>
            <div className="main flex">
                <div className="section1 w-1/2 border border-solid">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography variant="subtitle1"><b>Name</b></Typography></TableCell>
                                    <TableCell><Typography variant="subtitle1"><b>Email</b></Typography></TableCell>
                                    <TableCell><Typography variant="subtitle1"><b>Phone No.</b></Typography></TableCell>
                                    <TableCell><Typography variant="subtitle1"><b>Edit</b></Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataArr.map((row: any) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <EditIcon onClick={() => editData(row)} style={{ cursor: 'pointer' }} />
                                                <DeleteForeverIcon onClick={()=> deleteData(row._id)} style={{ cursor: 'pointer' }} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className="section2 w-1/2 border border-solid p-6">
                    <div className="border-gray-900/10 pb-12">
                        <div className="header font-semibold text-gray-900">Enter your Details</div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 px-1.2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={firstNameValue} onChange={(e: any) => firstNameFn(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="phone-no" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone No.
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="phone-no"
                                        id="phone-no"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={phoneValue} onChange={(e: any) => phoneFn(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={emailValue} onChange={(e) => emailFn(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row'>
                                <button onClick={sendValue}>{btnValue}</button>
                                <div style={{ marginRight: '5px' }}></div>
                                {btnValue == 'Update' && (
                                    <button onClick={cancel}>Cancel</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Crud;
