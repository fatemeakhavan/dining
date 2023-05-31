import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import Spinner from 'Spinner';
import { useStyles } from '../Styles';
import useAddMeal from '../../../Hooks/Meals/useAddMeal';
import { IDate } from '../../../Interfaces/Date.interface';
import { IMeal } from '../../../Interfaces/Meal.interface';
import useGetFoods from '../../../Hooks/Food/useGetFoods';
import { IFood } from '../../../Interfaces/Food';
import useGetBeverages from '../../../Hooks/Beverages/useGetBeverages';
import { IBeverage } from '../../../Interfaces/Beverage.interface';
import useGetRestaurants from '../../../Hooks/Restaurants/useGetRestaurants';
import useGetLocations from '../../../Hooks/Locations/useGetLocations';
import { ILocation } from '../../../Interfaces/Location.interface';
import { IRestaurant } from '../../../Interfaces/Restaurant.interface';
import { Autocomplete } from '@material-ui/lab';

interface IProps {
  handleClose: () => void;
  date: IDate;
  dates: IDate[];
}

enum EError {
  NAME = 'NAME',
  DNAME = 'DNAME',
  DESCRIPTION = 'DESCRIPTION',
  LOGO = 'LOGO',
  CATEGORY = 'CATEGORY',
}
const AddMeal = (props: IProps) => {
  const { handleClose, date, dates } = props;
  const addMealHook = useAddMeal();
  const foodListHook = useGetFoods();
  const beverageListHook = useGetBeverages();
  const locationsListHook = useGetLocations();
  const restaurantsListHook = useGetRestaurants();
  const [error, setError] = useState<EError | null>(null);
  const classes = useStyles();
  const nameRef = useRef<HTMLInputElement>(null);
  const foodsRef = useRef<HTMLSelectElement>(null);
  const beveragesRef = useRef<HTMLSelectElement>(null);
  const locationsRef = useRef<HTMLSelectElement>(null);
  const restaurantsRef = useRef<HTMLSelectElement>(null);
  const mealTypeRef = useRef<HTMLSelectElement>(null);
  const initialFoodsValue: number[] = [];
  const [foods, setFoods] = React.useState(initialFoodsValue);
  const [beverages, setBeveragesRef] = React.useState(initialFoodsValue);
  const [locations, setLocations] = React.useState(initialFoodsValue);
  const [restaurants, setRestaurants] = React.useState(initialFoodsValue);
  const [mealCards, setMealCards] = React.useState<IMeal[]>([]);
  let foodIds: number[] = [];
  let bevIds: number[] = [];

  useEffect(() => {
    if (dates[0]?.meal?.foods?.length !== 0 && dates[0]?.meal?.foods) {
      foodIds = dates[0]?.meal?.foods.map((food) => {
        return food.id;
      });
      setFoods(foodIds);
    }
    if (dates[0]?.meal?.beverages?.length !== 0 && dates[0]?.meal?.beverages) {
      bevIds = dates[0]?.meal?.beverages.map((bev) => {
        return bev.id;
      });
      setBeveragesRef(bevIds);
    }
  }, []);

  const handleDeleteFoods = (foodToDelete: number) => () => {
    if (foods !== null && foods.length !== 0) {
      setFoods((chips) => chips.filter((chip) => chip !== foodToDelete));
    }
  };

  const addBeverages = () => () => {
    if (beveragesRef.current?.value) {
      setBeveragesRef([...beverages, (beveragesRef.current?.value as unknown) as number]);
      beveragesRef.current.value = '';
    }
  };

  const handleDeleteBeverages = (foodToDelete: number) => () => {
    if (beverages !== null && beverages.length !== 0) {
      setBeveragesRef((chips) => chips.filter((chip) => chip !== foodToDelete));
    }
  };

  const addLocations = () => () => {
    if (locationsRef.current?.value) {
      setLocations([...locations, (locationsRef.current?.value as unknown) as number]);
      locationsRef.current.value = '';
    }
  };

  const handleDeleteLocations = (locationToDelete: number) => () => {
    if (locations !== null && locations.length !== 0) {
      setLocations((chips) => chips.filter((chip) => chip !== locationToDelete));
    }
  };

  const addRestaurants = () => () => {
    if (restaurantsRef.current?.value) {
      setRestaurants([...restaurants, (restaurantsRef.current?.value as unknown) as number]);
      restaurantsRef.current.value = '';
    }
  };

  const handleDeleteRestaurants = (restaurantToDelete: number) => () => {
    if (restaurants !== null && restaurants.length !== 0) {
      setRestaurants((chips) => chips.filter((chip) => chip !== restaurantToDelete));
    }
  };

  let foodsList: IFood[] = [];
  let foodNames: string[] = [];
  if (foodListHook.data?.length) {
    foodsList = foodListHook.data;
    foodsList.forEach((food) => {
      foodNames.push(food.name);
    });
  }

  let beveragesList: IBeverage[] = [];
  if (beverageListHook.data?.length) {
    beveragesList = beverageListHook.data;
  }

  let locationsList: ILocation[] = [];
  if (locationsListHook.data?.length) {
    locationsList = locationsListHook.data;
  }

  let restaurantsList: IRestaurant[] = [];
  if (restaurantsListHook.data?.length) {
    restaurantsList = restaurantsListHook.data;
  }

  const addFood = () => () => {
    if (foodsRef.current?.value) {
      const selectedFoodId = ((foodsList.find((food) => food?.name === foodsRef.current?.value) as unknown) as IFood).id;
      setFoods([...foods, selectedFoodId]);
      foodsRef.current.value = '';
    }
  };

  const addDateMeal = () => {
    const mealType = (mealTypeRef.current?.value as unknown) as string;
    const mealObj = [
      {
        dateId: date.id,
        foodIds: foods as number[],
        beverageIds: beverages as number[],
        locationIds: locations as number[],
        restaurantIds: restaurants as number[],
        mealType: mealType as string,
      },
    ];
    setMealCards((state) => {
      return state.concat(mealObj);
    });
    const meals = mealObj;
    addMealHook.mutate({
      meals,
      callBack: handleClose,
    });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>
        ثبت وعده غذایی ({date.dayName}-{date.date})
      </DialogTitle>
      <DialogContent>
        <Typography component="label" style={{ display: 'flex' }}>
          انتخاب غذا
        </Typography>
        <Box className={classes.tagInputBox}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={foodNames}
            style={{ width: '100%' }}
            renderInput={(params) => <TextField inputRef={foodsRef} {...params} label="نام غذا" />}
          />

          <Button variant="outlined" color="primary" style={{ marginRight: '4px' }} onClick={addFood()}>
            +
          </Button>
        </Box>
        {foods[0] ? (
          <ul className={classes.tagsList}>
            {foods.map((food) => {
              return (
                <li key={food}>
                  <Chip
                    label={foodsList.find((fod) => fod.id === food)?.name}
                    color="primary"
                    variant="outlined"
                    onDelete={handleDeleteFoods(food)}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <Box className={classes.tagsList}></Box>
        )}
        <Typography component="label" style={{ display: 'flex' }}>
          انتخاب نوشیدنی
        </Typography>
        <Box className={classes.tagInputBox}>
          <Select inputRef={beveragesRef} defaultValue={1} style={{ width: '100%', marginBottom: '15px' }}>
            {beveragesList.map((bev) => {
              return (
                <MenuItem key={bev.id} value={bev.id}>
                  {bev.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button variant="outlined" color="primary" style={{ marginRight: '4px' }} onClick={addBeverages()}>
            +
          </Button>
        </Box>
        {beverages[0] ? (
          <ul className={classes.tagsList}>
            {beverages.map((bev) => {
              return (
                <li key={bev}>
                  <Chip
                    label={beveragesList.find((bevr) => bevr.id === bev)?.name}
                    color="primary"
                    variant="outlined"
                    onDelete={handleDeleteBeverages(bev)}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <Box className={classes.tagsList}></Box>
        )}
        <Typography component="label" style={{ display: 'flex' }}>
          انتخاب رستوران
        </Typography>
        <Box className={classes.tagInputBox}>
          <Select inputRef={restaurantsRef} defaultValue={1} style={{ width: '100%', marginBottom: '15px' }}>
            {restaurantsList.map((res) => {
              return (
                <MenuItem key={res.id} value={res.id}>
                  {res.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button variant="outlined" color="primary" style={{ marginRight: '4px' }} onClick={addRestaurants()}>
            +
          </Button>
        </Box>
        {restaurants[0] ? (
          <ul className={classes.tagsList}>
            {restaurants.map((res) => {
              return (
                <li key={res}>
                  <Chip label={restaurantsList.find(rest => rest.id === res)?.name} color="primary" variant="outlined" onDelete={handleDeleteRestaurants(res)} />
                </li>
              );
            })}
          </ul>
        ) : (
          <Box className={classes.tagsList}></Box>
        )}
        <Typography component="label" style={{ display: 'flex' }}>
          انتخاب شعبه
        </Typography>
        <Box className={classes.tagInputBox}>
          <Select inputRef={locationsRef} defaultValue={1} style={{ width: '100%', marginBottom: '15px' }}>
            {locationsList.map((loc) => {
              return (
                <MenuItem key={loc.id} value={loc.id}>
                  {loc.name}
                </MenuItem>
              );
            })}
          </Select>
          <Button variant="outlined" color="primary" style={{ marginRight: '4px' }} onClick={addLocations()}>
            +
          </Button>
        </Box>
        {locations[0] ? (
          <ul className={classes.tagsList}>
            {locations.map((loc) => {
              return (
                <li key={loc}>
                  <Chip
                    label={locationsList.find((loca) => loca.id === loc)?.name}
                    color="primary"
                    variant="outlined"
                    onDelete={handleDeleteLocations(loc)}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <Box className={classes.tagsList}></Box>
        )}
        <Typography component="label" style={{ display: 'flex' }}>
          نوع وعده
        </Typography>
        <Select inputRef={mealTypeRef} defaultValue="LUNCH" style={{ width: '100%', marginBottom: '15px' }}>
          <MenuItem key="0" value="LUNCH">
            ناهار
          </MenuItem>
          {/*<MenuItem key="1" value="DINNER">*/}
          {/*  شام*/}
          {/*</MenuItem>*/}
          {/*<MenuItem key="2" value="SNACK">*/}
          {/*  میان وعده*/}
          {/*</MenuItem>*/}
        </Select>
      </DialogContent>
      <DialogActions>
        {addMealHook.isLoading ? (
          <Box display="inline-block" marginTop="-50px" marginRight="50px" position="relative">
            <Spinner />
          </Box>
        ) : null}
        <Box minWidth="100px">
          <Button fullWidth color="primary" onClick={handleClose} disabled={addMealHook.isLoading}>
            انصراف
          </Button>
        </Box>
        <Box minWidth="100px">
          <Button fullWidth variant="contained" color="primary" onClick={() => addDateMeal()} disabled={addMealHook.isLoading}>
            ایجاد
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddMeal;
