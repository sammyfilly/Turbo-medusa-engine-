import React from "react"
import { IconProps } from ".."

const IconCogSixToothSolid: React.FC<IconProps> = ({
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
        d="M9.23166 1.875C8.46749 1.875 7.81582 2.4275 7.68999 3.18083L7.54166 4.07417C7.52499 4.17417 7.44582 4.29083 7.29416 4.36417C7.00862 4.50143 6.73393 4.66022 6.47249 4.83917C6.33416 4.935 6.19416 4.94417 6.09749 4.90833L5.24999 4.59C4.90353 4.4602 4.52224 4.45755 4.174 4.58253C3.82577 4.70751 3.53318 4.95201 3.34832 5.2725L2.57999 6.60333C2.39507 6.92363 2.32975 7.29915 2.39567 7.66307C2.46159 8.027 2.65447 8.35575 2.93999 8.59083L3.63999 9.1675C3.71916 9.2325 3.78166 9.35833 3.76832 9.52583C3.74458 9.84178 3.74458 10.1591 3.76832 10.475C3.78082 10.6417 3.71916 10.7683 3.64082 10.8333L2.93999 11.41C2.65447 11.6451 2.46159 11.9738 2.39567 12.3378C2.32975 12.7017 2.39507 13.0772 2.57999 13.3975L3.34832 14.7283C3.53331 15.0487 3.82596 15.293 4.17418 15.4178C4.5224 15.5426 4.90362 15.5399 5.24999 15.41L6.09916 15.0917C6.19499 15.0558 6.33499 15.0658 6.47416 15.16C6.73416 15.3383 7.00832 15.4975 7.29499 15.635C7.44666 15.7083 7.52582 15.825 7.54249 15.9267L7.69082 16.8192C7.81666 17.5725 8.46832 18.125 9.23249 18.125H10.7692C11.5325 18.125 12.185 17.5725 12.3108 16.8192L12.4592 15.9258C12.4758 15.8258 12.5542 15.7092 12.7067 15.635C12.9933 15.4975 13.2675 15.3383 13.5275 15.16C13.6667 15.065 13.8067 15.0558 13.9025 15.0917L14.7525 15.41C15.0987 15.5394 15.4797 15.5418 15.8275 15.4168C16.1754 15.2919 16.4677 15.0476 16.6525 14.7275L17.4217 13.3967C17.6066 13.0764 17.6719 12.7009 17.606 12.3369C17.5401 11.973 17.3472 11.6443 17.0617 11.4092L16.3617 10.8325C16.2825 10.7675 16.22 10.6417 16.2333 10.4742C16.257 10.1582 16.257 9.84095 16.2333 9.525C16.22 9.35833 16.2825 9.23167 16.3608 9.16667L17.0608 8.59C17.6508 8.105 17.8033 7.265 17.4217 6.6025L16.6533 5.27167C16.4683 4.95132 16.1757 4.707 15.8275 4.58218C15.4792 4.45735 15.098 4.46013 14.7517 4.59L13.9017 4.90833C13.8067 4.94417 13.6667 4.93417 13.5275 4.83917C13.2663 4.66025 12.9919 4.50145 12.7067 4.36417C12.5542 4.29167 12.4758 4.175 12.4592 4.07417L12.31 3.18083C12.2492 2.81589 12.0609 2.48435 11.7786 2.24522C11.4963 2.0061 11.1383 1.87491 10.7683 1.875H9.23249H9.23166ZM9.99999 13.125C10.8288 13.125 11.6236 12.7958 12.2097 12.2097C12.7958 11.6237 13.125 10.8288 13.125 10C13.125 9.1712 12.7958 8.37634 12.2097 7.79029C11.6236 7.20424 10.8288 6.875 9.99999 6.875C9.17119 6.875 8.37633 7.20424 7.79028 7.79029C7.20423 8.37634 6.87499 9.1712 6.87499 10C6.87499 10.8288 7.20423 11.6237 7.79028 12.2097C8.37633 12.7958 9.17119 13.125 9.99999 13.125Z"
        className={
          iconColorClassName ||
          "tw-fill-medusa-icon-subtle dark:tw-fill-medusa-icon-subtle-dark"
        }
      />
    </svg>
  )
}

export default IconCogSixToothSolid
