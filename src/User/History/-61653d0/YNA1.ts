  fragment MarkerFields on Marker {
    tag
    title {
      ...IcuFields
    }
    description {
      ...IcuFields
    }
  }
