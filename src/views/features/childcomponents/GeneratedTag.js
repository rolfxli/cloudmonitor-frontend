import { CButton } from '@coreui/react'
import React from 'react'

export default function GeneratedTag({tagname}) {

    const countertop_labels = ["granite-countertop", "metal-countertop", "wood-countertop"]
    const door_labels = ['craftsman-door','french-door']
    const fireplace_labels = ["hanging-fireplace", "ribbon-fireplace", "standard-fireplace"]
    const floor_labels = ['dark-hardwood-floor','light-hardwood-floor', 'medium-hardwood-floor']
    const cabinet_labels = ['dark-cabinet','light-cabinet', 'medium-cabinet']
    const material_labels = ["brick-floor", "wood-floor", "tile-floor", "brick-wall", "wood-wall", "tile-wall", "brick-ceiling", "wood-ceiling", "tile-ceiling"]

    const detailed_tags = countertop_labels.concat(door_labels, fireplace_labels, floor_labels, cabinet_labels, material_labels)
    
    const color_tags = ["white",
    "black",
    "gray",
    "red",
    "pink",
    "orange",
    "tan",
    "yellow",
    "lightyellow",
    "green",
    "lightgreen",
    "teal",
    "blue",
    "lightblue",
    "purple",
    "brown",
    "lightbrown"]


    const roomtype_tags = ["bathroom", "bedroom", "closet", "diningroom", "frontal", "kitchen", "livingroom", "staircase", "views"]
    const special_tags = ['open-concept', 'nice-view', 'deck', 'natural-light']
    return (
        <CButton
        className='mr-3 mt-3 text-white'
        color={
            special_tags.includes(tagname) ? 'info' :
            roomtype_tags.includes(tagname) ? 'success' :
            detailed_tags.includes(tagname) ?'primary' :
            color_tags.includes(tagname) ? 'warning' :
            'danger'
        }     
        >
            {tagname}
                
        </CButton>
    )
}
