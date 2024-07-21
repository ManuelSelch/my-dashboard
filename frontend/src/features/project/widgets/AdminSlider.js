import React from "react";
import { useSelector, useDispatch } from 'react-redux';

// common
import Button from "../../../widgets/Common/Button";
import FileUpload from "../../../widgets/Common/FileUpload";

// features
import {deleteSliderImage, uploadSliderImage} from "../ProjectFeature";

const AdminSlider = () => {
    const project = useSelector((state) => state.project.project);
    const dispatch = useDispatch();

    return (
        <div>
            {project.images && 
                project.images.map((img, index) => (
                    <AdminImage img={img} key={index} handleDeleteImage={() => dispatch(deleteSliderImage(index))}/>
                ))
            }

            <FileUpload file={null} setFile={(file) => dispatch(uploadSliderImage(file))}/>
        </div>
    );
};

const AdminImage = ({img, handleDeleteImage}) => {
    return (
        <div className="m-5">
            <img
                src={img}
                width={"50%"}
                className="m-auto"
                alt = "img"
            />
            <div className="flex justify-center">
                <Button name="Delete" onClick={handleDeleteImage}/>
            </div>
        </div>
    );
};

export default AdminSlider;