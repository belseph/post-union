package com.example.demo.postInteractions.dto;

import java.util.List;
import java.util.Objects;

public class TagsRequest {
    private List<String> tagNames;

    public TagsRequest() {
    }

    public TagsRequest(List<String> tagNames) {
        this.tagNames = tagNames;
    }

    public List<String> getTagNames() {
        return tagNames;
    }

    public void setTagNames(List<String> tagNames) {
        this.tagNames = tagNames;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TagsRequest that = (TagsRequest) o;
        return Objects.equals(tagNames, that.tagNames);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tagNames);
    }

    @Override
    public String toString() {
        return "TagsRequest{" +
                "tagNames=" + tagNames +
                '}';
    }
}