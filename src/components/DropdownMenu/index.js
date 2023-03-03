import React, { useState } from "react";

import { CSSTransition } from "react-transition-group";

import useDropdownMenuStyles from "components/DropdownMenu/styles";
import DropdownItem from "components/DropdownItem";
import {
  AccountBoxRounded,
  ArrowBackIosRounded as ArrowBackIosRoundedIcon,
  ArrowForwardIosRounded as ArrowForwardIosRoundedIcon,
  PeopleAltRounded as PeopleAltRoundedIcon,
  SettingsRounded as SettingsRoundedIcon,
  ExitToAppRounded as ExitToAppRoundedIcon,
  LanguageRounded as LanguageRoundedIcon,
  TranslateRounded as TranslateRoundedIcon,
  HelpRounded as HelpRoundedIcon,
  FeedbackRounded as FeedbackRoundedIcon,
  KeyboardRounded as KeyboardRoundedIcon,
  Brightness4 as Brightness4Icon,
  MonetizationOn as MonetizationOnIcon,
} from "@material-ui/icons";

import { Typography, Divider } from "@material-ui/core";

import "./index.css";
import { authenAction } from "app/authen/authenSlice";
import store from "app/store";

const MENUS = {
  MAIN: "main",
  ACCOUNTS: "switch-account",
  SETTINGS: "settings",
  INTERFACES: "switch-interface",
  RESTRICT_MODE: "restrict-mode",
  LANGUAGES: "language",
  LOCATIONS: "location",
};

export default function DropdownMenu() {
  const classes = useDropdownMenuStyles();

  const [activeMenu, setActiveMenu] = useState(MENUS.MAIN);

  const [menuHeight, setMenuHeight] = useState(null);

  /**
   * Returns the element height including margins
   * @param element - element
   * @returns {number}
   */
  function outerHeight(element) {
    const height = element.offsetHeight;
    const style = window.getComputedStyle(element);

    const totalHeight = [
      "padding-top",
      "margin-top",
      "padding-bottom",
      "margin-bottom",
    ]
      .map((prop) => parseInt(style[prop]))
      .reduce((total, prop) => total + prop, height);

    setMenuHeight(totalHeight);

    return totalHeight;
  }

  return (
    <div
      className={classes.dropdown}
      style={{
        height: menuHeight,
      }}
    >
      <CSSTransition
        in={activeMenu === MENUS.MAIN}
        timeout={500}
        classNames="menu-primary"
        onEnter={outerHeight}
        unmountOnExit
      >
        <div className={classes.menu}>
          <DropdownItem leftIcon={<AccountBoxRounded />}>
            {"Your channel"}
          </DropdownItem>

          <DropdownItem leftIcon={<MonetizationOnIcon />}>
            {"Purchases and memberships"}
          </DropdownItem>

          <DropdownItem
            leftIcon={<PeopleAltRoundedIcon />}
            rightIcon={<ArrowForwardIosRoundedIcon />}
            goToMenu={MENUS.ACCOUNTS}
            setActiveMenu={setActiveMenu}
          >
            {"Switch account"}
          </DropdownItem>

          <div
            onClick={() => {
              store.dispatch(authenAction.logout());
            }}
          >
            <DropdownItem leftIcon={<ExitToAppRoundedIcon />}>
              {"Sign out"}
            </DropdownItem>
          </div>

          {/* <Divider style={{ margin: 8 }} /> */}

          <DropdownItem
            leftIcon={<Brightness4Icon />}
            rightIcon={<ArrowForwardIosRoundedIcon />}
            goToMenu={MENUS.INTERFACES}
            setActiveMenu={setActiveMenu}
          >
            {"Appearance"}
          </DropdownItem>

          <DropdownItem
            leftIcon={<TranslateRoundedIcon />}
            rightIcon={<ArrowForwardIosRoundedIcon />}
            goToMenu={MENUS.LANGUAGES}
            setActiveMenu={setActiveMenu}
          >
            {"Language: English"}
          </DropdownItem>

          <DropdownItem
            leftIcon={<LanguageRoundedIcon />}
            rightIcon={<ArrowForwardIosRoundedIcon />}
            goToMenu={MENUS.LOCATIONS}
            setActiveMenu={setActiveMenu}
          >
            {"Location: Vietnam"}
          </DropdownItem>

          <DropdownItem leftIcon={<SettingsRoundedIcon />}>
            {"Settings"}
          </DropdownItem>

          <DropdownItem leftIcon={<HelpRoundedIcon />}>
            {"Settings"}
          </DropdownItem>

          <DropdownItem leftIcon={<FeedbackRoundedIcon />}>
            {"Send feedback"}
          </DropdownItem>

          <DropdownItem leftIcon={<KeyboardRoundedIcon />}>
            {"Phím tắt"}
          </DropdownItem>

          <Divider style={{ margin: 8 }} />

          <DropdownItem
            leftIcon={<SettingsRoundedIcon />}
            rightIcon={<ArrowForwardIosRoundedIcon />}
            goToMenu={MENUS.RESTRICT_MODE}
            setActiveMenu={setActiveMenu}
          >
            {"Restricted Mode: Off"}
          </DropdownItem>
        </div>
      </CSSTransition>

      {/* Level 2 */}
      <CSSTransition
        in={activeMenu === MENUS.ACCOUNTS}
        timeout={500}
        classNames="menu-secondary"
        onEnter={outerHeight}
        unmountOnExit
      >
        <div className={classes.menu}>
          <DropdownItem
            leftIcon={<ArrowBackIosRoundedIcon />}
            goToMenu={MENUS.MAIN}
            setActiveMenu={setActiveMenu}
          >
            <Typography>Change account</Typography>
          </DropdownItem>

          <DropdownItem>
            <Typography>Account full information account</Typography>
          </DropdownItem>
        </div>
      </CSSTransition>

      {/* Level 2 */}
      <CSSTransition
        in={activeMenu === MENUS.INTERFACES}
        timeout={500}
        classNames="menu-secondary"
        onEnter={outerHeight}
        unmountOnExit
      >
        <div className={classes.menu}>
          <DropdownItem
            leftIcon={<ArrowBackIosRoundedIcon />}
            goToMenu={MENUS.MAIN}
            setActiveMenu={setActiveMenu}
          >
            <Typography>{"Appearance"}</Typography>
          </DropdownItem>

          <Typography>Some thing else trong giao diện</Typography>
        </div>
      </CSSTransition>

      {/* Level 2 */}
      <CSSTransition
        in={activeMenu === MENUS.LANGUAGES}
        timeout={500}
        classNames="menu-secondary"
        onEnter={outerHeight}
        unmountOnExit
      >
        <div className={classes.menu}>
          <DropdownItem
            leftIcon={<ArrowBackIosRoundedIcon />}
            goToMenu={MENUS.MAIN}
            setActiveMenu={setActiveMenu}
          >
            <Typography>Ngôn ngữ</Typography>
          </DropdownItem>

          <Typography>Some thing else of ngôn ngữ</Typography>
        </div>
      </CSSTransition>

      {/* Level 2 */}
      <CSSTransition
        in={activeMenu === MENUS.LOCATIONS}
        timeout={500}
        classNames="menu-secondary"
        onEnter={outerHeight}
        unmountOnExit
      >
        <div className={classes.menu}>
          <DropdownItem
            leftIcon={<ArrowBackIosRoundedIcon />}
            goToMenu={MENUS.MAIN}
            setActiveMenu={setActiveMenu}
          >
            <Typography>Location</Typography>
          </DropdownItem>

          <Typography>Some thing else of địa điểm</Typography>
        </div>
      </CSSTransition>

      {/* Level 2 */}
      <CSSTransition
        in={activeMenu === MENUS.RESTRICT_MODE}
        timeout={500}
        classNames="menu-secondary"
        onEnter={outerHeight}
        unmountOnExit
      >
        <div className={classes.menu}>
          <DropdownItem
            leftIcon={<ArrowBackIosRoundedIcon />}
            goToMenu={MENUS.MAIN}
            setActiveMenu={setActiveMenu}
          >
            <Typography>Restricted mode</Typography>
          </DropdownItem>

          <Typography>Some thing else of chế độ hạn chế</Typography>
        </div>
      </CSSTransition>
    </div>
  );
}
