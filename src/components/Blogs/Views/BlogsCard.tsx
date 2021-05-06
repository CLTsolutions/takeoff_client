import React, { Component } from 'react'

type acceptedProps = {
  token: string | null
}

interface BlogsCardState {
  blog: string
}

export class BlogsCard extends Component<acceptedProps, BlogsCardState> {
  constructor(props: acceptedProps) {
    super(props)
    this.state = {
      blog: '',
    }
  }

  render() {
    return <div></div>
  }
}

export default BlogsCard
