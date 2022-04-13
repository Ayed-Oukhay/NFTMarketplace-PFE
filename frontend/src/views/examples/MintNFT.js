import React, { useState, useEffect } from "react";
import "./MintNFT.css";
import { Input } from "reactstrap";
import Select from 'react-select';
import Attributes from '../../components/NFTCard/Attributes';
// Components for the unlockable content section
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

export default function MintNFT() {
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [unlockable, setUnlockable] = useState(false);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);

    const onImageChange = (e) => {
        setImages([...e.target.files]);
    }

    const handleSubmit = (event) => {
        console.log("sucess");
    }

    const blockchains = [
        { value: 'polygon', label: 'Polygon' },
        { value: 'solana', label: 'Solana' },
        { value: 'tron', label: 'Tron' },
        { value: 'flow', label: 'Flow' }
    ]

    const handleChange = (event) => { // Used for the unlockable content section
        setUnlockable(event.target.checked);
    };

    return (
        <>
            {/* --------------- Begin Navbar --------------- */}
            <ExamplesNavbar />
            {/* --------------- End Navbar --------------- */}

            <div className="wrapper">

                {/* -------------- Begin NFT Creation Form ----------------- */}
                <div className="content-center">
                    <section className="section section-lg">
                        <section className="section">
                            <small id="uploadMediaHelp" class="form-text text-muted">* Required fields</small>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label for="uploadMedia">Choose an Image, Video, Audio, or a 3D Model *</label>
                                    <small id="uploadMediaHelp" class="form-text text-muted">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</small>
                                    {/* <img alt="..." src={require("../../assets/img/image.png").default} style={{width:200,height:200}}> */}
                                    <input type="file" class="form-control" id="uploadMedia" aria-describedby="uploadMediaHelp" onChange={onImageChange} required />
                                    {imageURLs.map(imageSrc => <img alt="..." src={imageSrc} style={{ width: 200, height: 200 }} />)}
                                    {/* </img> */}
                                </div>
                                <div class="form-group" >
                                    <label for="exampleInputName">Name *</label>
                                    <input type="text" class="form-control" id="exampleInputName" aria-describedby="NameHelp" placeholder="Enter NFT name" required />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputLink">External Link</label>
                                    <small id="uploadMediaHelp" class="form-text text-muted">This will allow you to include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</small>
                                    <input type="text" class="form-control" id="exampleInputLink" placeholder="https://yoursite.com/item1/" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputDesc">Description</label>
                                    <small id="DescHelp" class="form-text text-muted">The description will be included on the item's detail page underneath its image.</small>
                                    <input type="text" class="form-control" id="exampleInputDesc" placeholder="Provide a detailed description of your item." />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Collection</label>
                                    <small id="DescHelp" class="form-text text-muted">This is the collection where your item will appear.</small>
                                    <select class="form-control" id="exampleColl">
                                        <option style={{ backgroundImage: "../../assets/img/image.png", width: 20, height: 20 }}>PhotographyCollection#123</option>
                                        <option>TestCollection...</option>
                                        <option>#3</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Properties</label>
                                    <small id="DescHelp" class="form-text text-muted">Add your NFT Traits.</small>
                                    <br />
                                    <Attributes />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Unlockable Content
                                        <small id="DescHelp" class="form-text text-muted">Include unlockable content that can only be revealed by the owner of the item.</small>
                                    </label>
                                    <br />
                                    <FormControlLabel
                                        control={
                                            <Switch checked={unlockable} onChange={handleChange} aria-label="login switch" />
                                        }
                                        label={unlockable ? <Input class="form-control" placeholder="Enter Content (Access key, Redeem code, link to a file,...)." rows="3" type="textarea" /> : <Input class="form-control" placeholder="Enter Content (Access key, Redeem code, link to a file,...)." rows="3" type="textarea" hidden />}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Supply</label>
                                    <small id="DescHelp" class="form-text text-muted">The amout of tokens you'll own.</small>
                                    <input type="number" class="form-control" id="exampleInputName" aria-describedby="NameHelp" placeholder="1" disabled />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlColl">Blockchain</label>
                                    <Select
                                        class="form-control"
                                        // className="basic-single"
                                        classNamePrefix="select Blockchain"
                                        defaultValue={blockchains[0]}
                                        name="blockchain"
                                        options={blockchains}
                                    />
                                </div>

                                <button type="submit" class="btn btn-primary">Create NFT</button>
                            </form>
                        </section>
                    </section>

                </div>
                {/* -------------------------- End NFT Creation Form ------------------------- */}
            </div>

            {/* --------------- Begin Footer --------------- */}
            <Footer />
            {/* --------------- End Footer --------------- */}

        </>
    );
}
