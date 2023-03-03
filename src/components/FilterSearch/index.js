import React, { useEffect, useState } from "react";

import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import { Container, Typography, Button, Grid, List } from "@material-ui/core";

import { useStyles } from "./styles";
import ItemFilter from "components/FilterSearch/ItemFilter";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import {
  UPDATE_DATE_OPTIONS,
  TYPE_OPTIONS,
  DURATION_OPTIONS,
  FEATURE_OPTIONS,
  ORDER_OPTIONS,
} from "constants/fitlerOptions";

const checkIfOptionIsRestricted = (option, currFilterState) => {
  if (!option.restrictions.length) {
    return false;
  }

  /**
   * currFilterState: {
   *  publishedAfter: "blah",
   *  type: "blah",
   *  duration: "blah"
   * }
   */

  /**
   * restriction: {
   *  key: 'type',
   *  values: [val1, val2, val3]
   * }
   */

  for (const restriction of option.restrictions) {
    if (!restriction.values && restriction.key) {
      // có thông tin về key nhưng ko có thông tin về các values nào bị cấm
      // đây là trường hợp cấm tất cả các option có key giống như key này
      if (currFilterState[restriction.key]) {
        // nếu trong state, key này có giá trị => vậy option này bị cấm
        return true;
      }
    }

    if (restriction.values?.includes(currFilterState[restriction.key])) {
      return true;
    }
  }

  return false;
};

export default function FilterSearch() {
  const history = useHistory();

  const classes = useStyles();
  const [show, setShow] = useState(false);

  const [filter, setFilter] = useState({
    publishedAfter: "",
    type: "",
    videoDuration: "",
    videoDefinition: "",
    videoCaption: "",
    videoDimension: "",
    order: ORDER_OPTIONS[0].value, // must be chosen under any search circumstances
  });

  const [reload, setReload] = useState(false); // flag need to reload when filter changes

  const handleShowFilter = () => {
    setShow(!show);
  };

  const handleAddFilterCriteria = (key, restrictions) => (value) => (event) => {
    console.log(`key: ${key} - value: ${value} - restrictions:`, restrictions);

    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        [key]: prevFilter[key] === value ? "" : value,
      };
    });

    setReload(true);
  };

  useEffect(() => {
    if (reload) {
      console.log("current url: ", window.location.search);

      const filterCriteriaArr = Object.keys(filter).map((key) => {
        if (filter[key]) {
          return `${key}=${filter[key]}`;
        }

        // keys that not match conditions will return undefined
        // filter(Boolean) to remove these undefined value
      });

      const curSearchParams = new URLSearchParams(window.location.search);
      const q = curSearchParams.get("q");

      let newSearch = [...filterCriteriaArr].filter(Boolean).join("&");

      setReload(false);
      if (newSearch) {
        newSearch = `&${newSearch}`;
      }

      history.push(`/search?q=${q}${newSearch}`, {
        ...filter,
      });
    }
  }, [filter]);

  return (
    <Container className={classes.root}>
      <Button className={classes.button} onClick={handleShowFilter}>
        <div
          className={classNames({
            [classes.buttonClicked]: show,
            [classes.button]: !show,
          })}
        >
          <TuneRoundedIcon className={classes.iconButton} />
          <Typography className={classes.label}>Filters</Typography>
        </div>
      </Button>

      {show && (
        <Grid container>
          <Grid item xs className={classes.filter}>
            <Typography className={classes.label}>Upload date</Typography>
            <hr />
            <div>
              {UPDATE_DATE_OPTIONS.map((option) => (
                <ItemFilter
                  key={option.text}
                  value={option.value}
                  active={filter[option.key] === option.value}
                  disabled={checkIfOptionIsRestricted(option, filter)}
                  handleAddFilterCriteria={handleAddFilterCriteria(
                    option.key,
                    option.restrictions
                  )}
                >
                  {option.text}
                </ItemFilter>
              ))}
            </div>
          </Grid>

          <Grid item xs className={classes.filter}>
            <Typography className={classes.label}>Type</Typography>
            <hr />
            <List>
              {TYPE_OPTIONS.map((option) => (
                <ItemFilter
                  key={option.text}
                  value={option.value}
                  active={filter[option.key] === option.value}
                  disabled={checkIfOptionIsRestricted(option, filter)}
                  handleAddFilterCriteria={handleAddFilterCriteria(
                    option.key,
                    option.restrictions
                  )}
                >
                  {option.text}
                </ItemFilter>
              ))}
            </List>
          </Grid>

          <Grid item xs className={classes.filter}>
            <Typography className={classes.label}>Duration</Typography>
            <hr />
            <List>
              {DURATION_OPTIONS.map((option) => (
                <ItemFilter
                  key={option.text}
                  value={option.value}
                  active={filter[option.key] === option.value}
                  disabled={checkIfOptionIsRestricted(option, filter)}
                  handleAddFilterCriteria={handleAddFilterCriteria(
                    option.key,
                    option.restrictions
                  )}
                >
                  {option.text}
                </ItemFilter>
              ))}
            </List>
          </Grid>

          <Grid item xs className={classes.filter}>
            <Typography className={classes.label}>Features</Typography>
            <hr />
            <List>
              {FEATURE_OPTIONS.map((option) => (
                <ItemFilter
                  key={option.text}
                  value={option.value}
                  active={filter[option.key] === option.value}
                  disabled={checkIfOptionIsRestricted(option, filter)}
                  handleAddFilterCriteria={handleAddFilterCriteria(
                    option.key,
                    option.restrictions
                  )}
                >
                  {option.text}
                </ItemFilter>
              ))}
            </List>
          </Grid>

          {/* SORTED BY */}
          <Grid item xs className={classes.filter}>
            <Typography className={classes.label}>SORTED BY</Typography>
            <hr />
            <List>
              {ORDER_OPTIONS.map((option) => (
                <ItemFilter
                  key={option.text}
                  value={option.value}
                  active={filter[option.key] === option.value}
                  hideClearIcon={true}
                  handleAddFilterCriteria={handleAddFilterCriteria(
                    option.key,
                    option.restrictions
                  )}
                >
                  {option.text}
                </ItemFilter>
              ))}
            </List>
          </Grid>
        </Grid>
      )}
      <hr />
    </Container>
  );
}
