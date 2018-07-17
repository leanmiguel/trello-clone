import React from 'react';
import { Col, Button, Card, CardTitle, Input, DropdownItem, InputGroup, InputGroupAddon } from 'reactstrap';
import ListItemModal from '../ListItemModal/ListItemModal';

class ListCard extends React.Component {
    state = {
        id: this.props.id,
        title: this.props.title,
        addItemClicked: false,
        addInput: null,
        listItems: this.props.listItems,
        modalOpen: false,
        currentItem: null,

    }

    toggleClickedHandler = () => {
        this.setState({ addItemClicked: !this.state.addItemClicked });

    }

    inputHandler = (e) => {
        this.setState({ addInput: e.target.value });
    }

    resetAddForm = () => {
        //this function was created so the board is able to access it
        this.setState({ addInput: null, addItemClicked: false });
    }


    toggleModal = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }


    render() {
        let addForm =
            (
                <InputGroup style={{ marginTop: 5 }}>

                    <Input placeholder='Input Item' onChange={this.inputHandler} />

                    <InputGroupAddon addonType="append">
                        <Button
                            color="primary"
                            onClick={() => { this.props.addListItemHandler(this.state.id, this.state.addInput, this.resetAddForm) }}>
                            +</Button></InputGroupAddon>
                    <InputGroupAddon addonType="append"><Button color="secondary" onClick={() => { this.toggleClickedHandler() }}>x</Button></InputGroupAddon>
                </InputGroup>

            );

        let addButton = (<Button color="primary" onClick={() => { this.toggleClickedHandler() }} style={{ marginTop: 5 }} >+</Button>)


        let listItems = this.state.listItems.map((item) => {


            return <Button
                outline
                color="primary"
                key={`${item}${Date.now() * Math.random()}`}
                style={{ marginTop: 5 }}
                onClick={() => {
                    this.setState({ currentItem: item });
                    this.toggleModal()
                }}>
                {item.name}
            </Button>;

        });


        return (
            <React.Fragment>
                <Col sm={{ size: 3 }} style={{ padding: 2 }}>
                    <Card className="bg-light text-dark" style={{ padding: '5px' }}>
                        <CardTitle className="text-center">{this.state.title}</CardTitle>
                        <DropdownItem divider></DropdownItem>
                        {listItems}

                        {this.state.addItemClicked ? addForm : addButton}

                    </Card>
                </Col>

                <ListItemModal item={this.state.currentItem} toggleModal={this.toggleModal} isOpen={this.state.modalOpen} modifyListItemHandler={this.props.modifyListItemHandler}></ListItemModal>


            </React.Fragment>
        )
    }

}

export default ListCard;