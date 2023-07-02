import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Grid,
  TextField,
  Select,
  Radio,
  FormControl,
  FormLabel,
  InputLabel,
  RadioGroup,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(30).required("Please enter your name"),
  address: Yup.string().required("Please enter your address"),
  country: Yup.string().required("Please select your country"),
  gender: Yup.string().required("Please select your gender"),
  hobbies: Yup.array().min(1, "Please select at least one hobby").required("Please select your hobbies"),
});

const hobbies = [
  { label: "Reading", value: "reading" },
  { label: "Sports", value: "sports" },
  { label: "Traveling", value: "traveling" },
  { label: "Music", value: "music" },
];

const UserForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      country: "",
      gender: "",
      hobbies: [],
    },
    validationSchema,
    onSubmit: (values, action) => {
      console.log("Form submitted:", values);
      action.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center">
            User Information
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel
              id="country-label"
              error={formik.touched.country && formik.errors.country}
            >
              Country
            </InputLabel>
            <Select
              name="country"
              labelId="country-label"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
              <MenuItem value="United Kingdom">United Kingdom</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            multiline
            minRows={4}
            label="Address"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Grid>
        <Grid item xs={7}>
          <FormControl>
            <FormLabel
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              Gender
            </FormLabel>
            <RadioGroup
              name="gender"
              row
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel
                value="male"
                control={<Radio color="primary" />}
                label="Male"
              />
              <FormControlLabel
                value="female"
                control={<Radio color="primary" />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio color="primary" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel
              id="hobbies-label"
              error={formik.touched.hobbies && formik.errors.hobbies}
            >
              Hobbies/Interests
            </InputLabel>
            <Select
              id="hobbies"
              name="hobbies"
              labelId="hobbies-label"
              multiple
              value={formik.values.hobbies}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
              renderValue={(selected) => selected.join(", ")}
            >
              {hobbies.map((hobby) => (
                <MenuItem key={hobby.value} value={hobby.value}>
                  <Checkbox
                    color="primary"
                    checked={formik.values.hobbies.includes(hobby.value)}
                  />
                  {hobby.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
