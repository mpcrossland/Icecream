import React from ‘react’;

export default class ImageUpload extends React.Component {
    constructor() {
        super();
        this.state = {
            value: ‘’,
            currentImage: ‘’
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFile(e) {
        this.setState({
            value: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        var file = this.file.files[0]
        console.log(this.file.files[0])
        const imgUrl = this.state.value
        
        var storageRef = firebase.storage().ref();
        console.log(this.file.files[0])
        //create a space for the image in the storageRef.child in firebase.
        const thisImage = storageRef.child(this.file.files[0].name)

        //upload file
        thisImage.put(file).then((snapshot) => {
            //get url from uploaded image
            thisImage.getDownloadURL().then((url) => {
                console.log(url);
                this.setState({
                    //add url to current image to put onto the page
                    currentImage: url
                })
            })
        });
      }

   render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input type=“file” ref={(ref)=> {this.file = ref}}/>
                <input type=“submit” value=“Submit” />
            </form>
            <img src={this.state.currentImage} alt=“” />
        </div>
        )
    }
}