import { Link, LinkProps } from "react-router-dom";

export function CmsnLink(props: LinkProps) {
    return <Link {...props} className="text-cmsn-gray hover:text-cmsn-turquoise ease-in-out duration-100 flex gap-2 items-center">
        {props.children}
    </Link>
}