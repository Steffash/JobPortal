import { useState } from "react";
import { useForm } from "react-hook-form";
import { resolvePath } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';

const CreateJob = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        data.skills = selectedOption;
        // console.log(data);
        fetch("http://localhost:3000/post-job", {
            method: "POST",
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            if(result.acknowledged == true){
                alert("Job Posted Successfully!!")
            }
            reset()
        });
    };

    // select skills
    const options = [
        { value: "JavaScript", label: "JavaScript" },
        { value: "C++", label: "C++" },
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "Python", label: "Python" },
        { value: "React js", label: "React js" },
        { value: "Node js", label: "Node js" },
        { value: "MongoDB", label: "MongoDB" },
    ];

    return (
        <div className='max-w-screen-xl container mx-auto xl:px-24 px-14'>
            {/* form */}
            <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* first row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Title</label>
                            <input type="text" defaultValue={"Web developer"} 
                                {...register("jobTitle")} className="create-job-input"/>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Name</label>
                            <input type="text" placeholder={"Ex: Microsoft"} 
                                {...register("companyName")} className="create-job-input"/>
                        </div>
                    </div>

                    {/* second row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Minimum Salary</label>
                            <input type="text" placeholder={"$20"} 
                                {...register("minPrice")} className="create-job-input"/>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Maximum Salary</label>
                            <input type="text" placeholder={"$120"} 
                                {...register("maxPrice")} className="create-job-input"/>
                        </div>
                    </div>

                    {/* third row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Salary Type</label>
                            <select {...register("salaryType")} className="create-job-input">
                                <option value="">Select your salary type</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Location</label>
                            <input type="text" placeholder={"Ex: New York "} 
                                {...register("jobLocation")} className="create-job-input"/>
                        </div>
                    </div>

                    {/* fourth row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Job Posting Date</label>
                            <input type="date" placeholder={"Ex: 2024-07-22"} 
                                {...register("postingDate")} className="create-job-input"/>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Experience Level</label>
                            <select {...register("experienceLevel")} className="create-job-input">
                                <option value="">Select Your Experience Level</option>
                                <option value="Any experience">Any experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work remotely</option>
                            </select>
                        </div>
                    </div>

                    {/* fifth row */}
                    <div>
                        <label className="block mb-2 text-lg">Required skill Sets:</label>
                        <CreatableSelect 
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                            className="create-job-input py-4"/>
                    </div>

                    {/* sixth row */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Company Logo</label>
                            <input type="url" placeholder={"Paste your company logo URL:https://weshare.com/img1"} 
                                {...register("companyLogo")} className="create-job-input"/>
                        </div>
                        <div className="lg:w-1/2 w-full">
                            <label className="block mb-2 text-lg">Employment Type</label>
                            <select {...register("employmentType")} className="create-job-input">
                                <option value="">Select Your Employment Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </div>
                    </div>

                    {/* seventh row */}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Job Description</label>
                        <textarea className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
                            rows={6}
                            defaultValue={"We are looking for a talented and passionate Web Developer to join our team. As a Web Developer at Linear Company, you will be responsible for designing, coding, and modifying websites, from layout to function and according to our clients' specifications."}
                            placeholder="Job Description"
                            {...register("description")}/>
                    </div>

                    {/* last row */}
                    <div className="w-full">
                        <label className="block mb-2 text-lg">Job Posted By</label>
                        <input 
                            type="email" 
                            placeholder="enter your email"
                            {...register("postedBy")} 
                            className="create-job-input"/>
                    </div>

                    <input type="submit" className="block my-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"/>
                </form>
            </div>
        </div>
    );
};

export default CreateJob;
