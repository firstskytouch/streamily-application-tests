import React, { useState } from 'react';
import Modal from "react-modal";
import { useForm } from "react-hook-form";

Modal.setAppElement('#modal');

const initCustomerData = [
    {customer_id: 1, first_name: "Bob", last_name: "Smith", address: "87 Main St", address2: "Apt 87", city: "Los Angeles", state: "CA", zip_code: "17435"},
    {customer_id: 2, first_name: "Barb", last_name: "Belmont", address: "84 Palm", address2: null, city: "Petersburg", state: "AR", zip_code: "34625"},
    {customer_id: 3, first_name: "Jerry", last_name: "Seinfeld", address: "4876 22nd", address2: "4", city: "New York City", state: "NY", zip_code: "38756"},
    {customer_id: 4, first_name: "Yijun", last_name: "Li", address: "95 Cherry", address2: null, city: "Orlando", state: "FL", zip_code: "26564"},
    {customer_id: 5, first_name: "Corey", last_name: "Smith", address: "83573 Oregon Ave", address2: "Suite # 544", city: "Eagle Rock", state: "WA", zip_code: "97524"},
    {customer_id: 6, first_name: "Gloria", last_name: "Hernandez", address: "9 Pine Rd", address2: "2", city: "Sacramento", state: "CA", zip_code: "34655"}
];

const Customer = ({data, onEdit}) => {

    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <div style={{
                padding: '10px', margin: '10px',
                display: 'flex', flexDirection: 'column',
                boxShadow: '1px 1px 2px 1px rgba(0,0,0,0.1)',
                borderRadius: '5px', minWidth: '300px'
            }}>
                <b>Customer Address:</b>
                <div>{data.first_name} {data.last_name}</div>
                <div>{data.address}{data.address2 ? `, ${data.address2}` : ''}</div>
                <div>{data.city}, {data.state}, US {data.zip_code}</div>
                <button onClick={onEdit} style={{margin: '10px', cursor: 'pointer'}}>Edit</button>
            </div>
        </div>
    );
};

const EditModal = ({data, isOpen, onClose, onChange}) => {
    const customStyles = {
        content: {
            minWidth: '480px',
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    const { register, handleSubmit } = useForm();
    const onSubmit = data => onChange(data);

    return (
        <Modal isOpen={isOpen} style={customStyles}>
            <h2>Edit Customer</h2>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" className="form-control" id="first_name" defaultValue={data.first_name} {...register("first_name")} />
                    <br />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" className="form-control" id="last_name" defaultValue={data.last_name} {...register("last_name")} />
                    <br />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" defaultValue={data.address} {...register("address")} />
                    <br />
                </div>
                <div className="form-group">
                    <label htmlFor="address2">Address 2</label>
                    <input type="text" className="form-control" id="address2" defaultValue={data.address2} {...register("address2")} />
                    <br />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city" defaultValue={data.city} {...register("city")} />
                    <br />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="text" className="form-control" id="state" defaultValue={data.state} {...register("state")} />
                    <br />
                </div>
                <div className="form-group">
                    <label htmlFor="zip_code">Zip Code</label>
                    <input type="text" className="form-control" id="zip_code" defaultValue={data.zip_code} {...register("zip_code")} />
                    <br />
                </div>
                <div className='d-flex gap-1'>
                    <button className="btn btn-primary col-6" type="submit">Submit</button>
                    <button className="btn btn-primary col-6" type="button" onClick={onClose}>Exit</button>
                </div>
            </form>
        </Modal>
    )
}

const CustomerDirectory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(initCustomerData);
    const [selected, setSelected] = useState(-1);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setSelected(-1);
    }

    return(
        <div>
            <h1 style={{marginLeft: '10px'}}>Customers:</h1>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {data.map((customer, i) => <Customer key={customer.customer_id} data={customer} onEdit={() => {
                    setSelected(i);
                    openModal();
                }}/>)}
            </div>
            {selected !== -1 && <EditModal isOpen={isOpen} data={data[selected]} onClose={closeModal} onChange={(customer) => {
                const newData = {...data[selected], ...customer};
                data.splice(selected, 1, newData);
                setData([...data]);
                closeModal();
            }} />}
        </div>
    );
};

export default CustomerDirectory;
