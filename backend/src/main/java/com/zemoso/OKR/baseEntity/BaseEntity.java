package com.zemoso.OKR.baseEntity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;


import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@MappedSuperclass
public class BaseEntity implements Serializable {
@Id
@GeneratedValue(generator = "uuid2")
@GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
@Type(type="org.hibernate.type.UUIDCharType")
private UUID id;

@Column
@CreationTimestamp
private LocalDateTime createdTime;

@Column
@UpdateTimestamp
private LocalDateTime updatedTime;

@Column
private boolean deleted = false;

@Type(type="org.hibernate.type.UUIDCharType")
@Column UUID createdBy;

@Type(type="org.hibernate.type.UUIDCharType")
@Column UUID updatedBy;


}
