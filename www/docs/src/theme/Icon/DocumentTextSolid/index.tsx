import React from "react"
import { IconProps } from ".."

const IconDocumentTextSolid: React.FC<IconProps> = ({
  iconColorClassName,
  ...props
}) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.91521 1.625C4.08888 1.625 3.41968 2.295 3.41968 3.12054V16.8795C3.41968 17.705 4.08968 18.375 4.91521 18.375H15.0849C15.9104 18.375 16.5804 17.705 16.5804 16.8795V10.5982C16.5804 9.80493 16.2653 9.04414 15.7043 8.48321C15.1434 7.92227 14.3826 7.60714 13.5893 7.60714H12.0938C11.6971 7.60714 11.3167 7.44958 11.0363 7.16911C10.7558 6.88864 10.5982 6.50825 10.5982 6.11161V4.61607C10.5982 3.82279 10.2831 3.062 9.72218 2.50106C9.16125 1.94013 8.40046 1.625 7.60718 1.625H4.91521ZM6.41075 12.3929C6.41075 12.2342 6.47378 12.082 6.58596 11.9699C6.69815 11.8577 6.85031 11.7946 7.00896 11.7946H12.9911C13.1498 11.7946 13.3019 11.8577 13.4141 11.9699C13.5263 12.082 13.5893 12.2342 13.5893 12.3929C13.5893 12.5515 13.5263 12.7037 13.4141 12.8159C13.3019 12.928 13.1498 12.9911 12.9911 12.9911H7.00896C6.85031 12.9911 6.69815 12.928 6.58596 12.8159C6.47378 12.7037 6.41075 12.5515 6.41075 12.3929ZM7.00896 14.1875C6.85031 14.1875 6.69815 14.2505 6.58596 14.3627C6.47378 14.4749 6.41075 14.6271 6.41075 14.7857C6.41075 14.9444 6.47378 15.0965 6.58596 15.2087C6.69815 15.3209 6.85031 15.3839 7.00896 15.3839H10C10.1587 15.3839 10.3108 15.3209 10.423 15.2087C10.5352 15.0965 10.5982 14.9444 10.5982 14.7857C10.5982 14.6271 10.5352 14.4749 10.423 14.3627C10.3108 14.2505 10.1587 14.1875 10 14.1875H7.00896Z"
        className={
          iconColorClassName ||
          "fill-medusa-fg-subtle dark:fill-medusa-fg-subtle-dark"
        }
      />
      <path
        d="M10.7745 1.8772C11.4338 2.6373 11.7961 3.61006 11.7947 4.61622V6.11176C11.7947 6.27686 11.9287 6.41086 12.0938 6.41086H13.5893C14.5955 6.40947 15.5683 6.77177 16.3284 7.43102C15.9774 6.09637 15.2783 4.87888 14.3025 3.90306C13.3267 2.92724 12.1092 2.22812 10.7745 1.8772Z"
        className={
          iconColorClassName ||
          "fill-medusa-fg-subtle dark:fill-medusa-fg-subtle-dark"
        }
      />
    </svg>
  )
}

export default IconDocumentTextSolid