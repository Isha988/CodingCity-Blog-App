import React from 'react'

function Header({className,  heading, totalCount, para, children}) {
  return (
    <header className={`header simpleHeader ${className}`}>
        <div className="inner">
          <div className="content">
            {children != undefined && children}
            <div className="contentText">
              <h1 className="h1">  {heading} </h1>
              {(totalCount != undefined) && <p className="metaData">{totalCount} blogs</p>}
              {para!=undefined && <p className="para"> {para} </p>}
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header
