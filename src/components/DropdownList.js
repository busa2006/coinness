import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {IoIosFolderOpen} from 'react-icons/io';

const DropdownList = ({categories,handleCategoryChange,dropdownOpen,toggle,categoryName}) => {

    const catetoryList = categories.map(
        catetory => (
            <DropdownItem key={catetory.id}><div  id={catetory.id} onClick={handleCategoryChange} >{catetory.name}</div></DropdownItem>
        )
    );

    return (
      <div style={{display:'flex', float:'left', margin:'5px'}}> 
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle color={"white"} caret><IoIosFolderOpen/></DropdownToggle>
              <DropdownMenu>
                  <DropdownItem header>카테고리</DropdownItem>
                  {catetoryList}
              </DropdownMenu>
          </ButtonDropdown>
          <div style={{padding:'1rem 0.5rem 1rem 0.5rem'}}>
              {categoryName && categoryName.name}
          </div>
      </div>
      )
}

export default DropdownList;
